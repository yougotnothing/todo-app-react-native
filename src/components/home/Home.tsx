// Home.tsx

import { useNavigation } from "@react-navigation/native";
import { Button, Container, Input, Title, Text } from "./Home.styled";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { api } from "../../api/axios.config";

export default function Home() {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [tasks, setTasks] = useState<any[]>([]);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const loadPage = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log('token', token);

        if(token && token.length > 0) {
          setLoggedIn(true);
          const response = await api.get('/user/get-tasks', {
            headers: {
              Authorization: `Basic ${token}`
            }
          });
          console.log('response', response.data.tasks);
          setTasks(response.data);
        }else{
          console.log('No token found');
        }
      } catch (error: any) {
        console.log(error.message);
      }
    }

    loadPage();
  }, [loggedIn])

  useEffect(() => {
    console.log('login', login);
    console.log('password', password);
  }, [login, password]);

  const handleLogin = async () => {
    try {
      const response = await api.post('/auth/login', {
        name: login,
        password: password
      });
      await AsyncStorage.setItem('token', response.data.token);
      setLoggedIn(true);
      console.log('Successfully logged in');
    } catch (error: any) {
      console.log(error.message);
    }
  }

  return (
    <Container>
      <Input
        placeholder="Enter your name"
        value={login}
        onChangeText={setLogin}
      />
      <Input
        placeholder="Enter your password"
        textContentType="password"
        value={password}
        onChangeText={setPassword}
      />
      <Button onPress={handleLogin}><Text>Login</Text></Button>
    </Container>
  )
}
