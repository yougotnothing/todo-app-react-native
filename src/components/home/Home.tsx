import { useNavigation } from "@react-navigation/native";
import { Container, Task, TasksWrapper } from "./Home.styled";
import Text from "../../templates/components/Text";
import React, { useEffect, useState } from "react";
import Button from "../../templates/components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../api/axios.config";
import { FlatList } from "react-native";
import { TodoDto } from "../../dto/todo.dto";
import { colors } from "../../templates/colors";

export default function Home() {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [tasks, setTasks] = useState<TodoDto[]>([]);
  const navigation = useNavigation();

  const handleGetTasks = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log('token', token);

      if (!token) {
        console.log('Token not found');
        return;
      }

      const response = await api.get('/user/get-tasks', {
        headers: {
          Authorization: `Basic ${token}`
        }
      });

      console.log('response', response.data.tasks);
      setTasks(response.data.tasks);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    handleGetTasks();
  }, []);

  return (
    <Container>
      <Text color={colors.fonts.blue} size="large" weight="700" text="todo"/>
      <TasksWrapper>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Task>
              <Text color={colors.fonts.blue} size="medium" weight="700" text={item.header} />
              <Text color={colors.fonts.black} size="small" weight="400" text={item.content} />
            </Task>
          )}
        />
      </TasksWrapper>
      <Button onPress={handleGetTasks} text="get tasks" />
    </Container>
  )
}
