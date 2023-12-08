import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View,TouchableOpacity } from 'react-native';

const URL = 'https://650663f03a38daf4803e724d.mockapi.io/phamducnhan/Nhan';

export default function Screen1({navigation}) {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() =>{
    fetch(URL, {
      method: 'GET',
      headers: {'content-type': 'application/json'},
    }).then((res) =>{
      if(res.ok){
        return res.json();
      }
    }).then((data) =>{
      console.log(data);
      setData(data);
    }).catch((error) =>{
      console.log(error);
    });
  }, []);

  const handleLogin = () =>{
    const user = data.find((user) => user.username === username && user.pass === password);
    console.log(user);
    if(user){
      console.log('Login thành công');
      navigation.navigate({
        name: "Screen2",
        params: {
          user: user,
        },
      });
    }else{
      console.log("Login thất bại");
    }
  };
  return (
    <View style={styles.container}>
      <TextInput 
      onChangeText={(text) => setUsername(text)}
      value= {username}
      style={{borderWidth: 1}} placeholder='username'/>
      <TextInput 
      onChangeText={(text) => setPassword(text)}
      value={password}
      style={{borderWidth: 1,marginTop: 10}} placeholder='password'/>
      <TouchableOpacity style={{borderWidth: 1, width: 70, marginTop: 10}} onPress={handleLogin}>
        Screen2
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