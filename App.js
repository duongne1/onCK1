import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Screen1 from "./views/Screen1.js";
import Screen2 from "./views/Screen2.js";
import { Provider } from "react-redux";
import store from './redux/stores';

const Stack = createNativeStackNavigator();
export default function App() {
  return(
    <Provider store={store}>
      <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen options={{ headerShown: true }} name="Screen1" component={Screen1} /> 
         <Stack.Screen options={{ headerShown: true }} name="Screen2" component={Screen2} /> 
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
