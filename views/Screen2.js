import { useState,useEffect } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import store from '../redux/stores';
import { setUser, addJob, deleteJob, updateJob } from '../redux/actions';
import {useDispatch, useSelector} from "react-redux";

const URL = 'https://650663f03a38daf4803e724d.mockapi.io/phamducnhan/Nhan';
export default function Screen2({route}) {
  const [selectedJob, setSelectedJob] = useState(null);
  const [nameJob, setNameJob] = useState("");
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.job);
  console.log('userData',userData);

  useEffect(() => {
        store.dispatch(setUser(route.params.user));
        setData(route.params.user);
  }, [route.params.user]);

  const handleAdd = () => {
    dispatch(addJob(nameJob));
    console.log(nameJob);
    setNameJob('');
};
const handleDelete = (id) => {
  dispatch(deleteJob(id));
};

const handleUpdate = () => {
  if (selectedJob) {
      store.dispatch(updateJob(selectedJob.id, nameJob));
      setSelectedJob(null);
      setNameJob('');
  }
};
const handleSelect = (item) => {
  setSelectedJob(item);
  setNameJob(item.name);
};

const handleUpAPI = async () =>{
  try{
    const updateUser = store.getState();
    const response = await fetch(`${URL}/${updateUser.id}`,{
      method: "PUT",
      headers: {
        'content-type': "application/json",
      },
      body: JSON.stringify(updateUser),
    });
    const data = await response.json();
    console.log(data);
    if(!response.ok){
      throw new Error("Network not ok");
    }else{
      alert("Đồng bộ api thành công");
    }
  }catch{
    alert("Đồng bộ api thất bại");
  }
};
  return (
    <View style={styles.container}>
      <Text>Hi, {route.params.user.username}!</Text>
      <TextInput
      onChangeText={(text) => setNameJob(text)}
      value={nameJob}
      style={{borderWidth: 1, margin: 5}} placeholder='Nhập job'/>
      <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={{borderWidth: 1, marginRight: 10,}} onPress={handleAdd}
          >ADD</TouchableOpacity>
          <TouchableOpacity style={{borderWidth: 1}}onPress={() => { handleUpdate() }}
          >UPDATE</TouchableOpacity>
      </View>
      <Text style={{marginTop: 8}}>LIST JOB</Text>
      <FlatList
      data={userData}
      keyExtractor={(item) =>item.id.toString()}
      renderItem={({item})=>(
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => handleSelect(item)}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{borderWidth: 1, width: 60, marginLeft: 10}}
          onPress={() => handleDelete(item.id)}>
            <Text>DELETE</Text>
          </TouchableOpacity>
         </View>
      )}
      />
      <TouchableOpacity style={{borderWidth: 1, width: 140}}
      onPress={handleUpAPI}>
        ĐỒNG BỘ API
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
});