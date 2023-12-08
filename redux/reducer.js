//reducer.js
const init = {
    id: "",
    username: "",
    password: "",
    job: []
};
const reducer = (state = init, action) =>{
    switch(action.type){
        case "SET_USER":
            return {
                ...state,
                id: action.user.id,
                username: action.user.username,
                password: action.user.password,
                job: action.user.job
            };
        case "ADD_JOB":
            const maxId = Math.max(...state.job.map(item => item.id),0);
            const newId = maxId + 1 ;
            return{
                ...state,
                job: [...state.job, {id: newId, name: action.job}]
            };
        case "DELETE_JOB":
            const updateJob = state.job.filter(item => item.id !== action.id);
            return{
                ...state,
                job: updateJob
            };
        case "UPDATE_JOB": 
            return{
                ...state,
                job: state.job.map(item =>{
                    if(item.id == action.id){
                        return {...item, name: action.job};
                    }
                    return item;
                })
            };
    }
}
export default reducer;