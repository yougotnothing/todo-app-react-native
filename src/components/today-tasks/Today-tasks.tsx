import { SvgXml } from "react-native-svg";
import { AddTask, ArrowDown, Circle, Footer, FooterMainInfo, Navbar, ReturnButton, TasksWrapper, Wrapper } from "./Today-tasks.styled";
import Icons from "@icons";
import Task from "@templates/Task";
import { DrawerActions, DrawerRouter, useNavigation } from "@react-navigation/native";
import Text from "@templates/Text";
import { useEffect, useState } from "react";
import { api } from "axios-config";
import { TodoDto } from "dto/todo.dto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerContent, useDrawerProgress } from "@react-navigation/drawer";

export default function TodayTasks() {
  const [todayTasks, setTodayTasks] = useState<TodoDto[]>([]); 
  const { navigate, dispatch } = useNavigation<any>();

  useEffect(() => {
    (async () => {
      const date = new Date().toUTCString().split(' ');
      const dateString = `${date[1]} ${date[2]}, ${date[3]}`; 

      console.log('date', dateString);
      try {
        const token = await AsyncStorage.getItem('token');
        
        const response = await api.get('/tasks/today-tasks', {
          headers: {
            Authorization: `Basic ${token}`
          },
          params: {
            createdAt: dateString
          }
        });
        
        console.log('response', response.data);
        setTodayTasks(response.data.tasks);
      }catch(error: any) {
        console.error(error);
      }
    })();
  }, []);
  

  return (
    <Wrapper>
      <Circle $left={0}>
        <SvgXml width={250} height={250} xml={Icons["right circle"]} />
      </Circle>
      <Circle $right={0} $top={0}>
        <SvgXml xml={Icons["bottom circle"]} />
      </Circle>
      <Navbar>
        <ReturnButton onPress={() => navigate('Home')}>
          <SvgXml xml={Icons["white back button"]} />
        </ReturnButton>
        <Text color="white" fontFamily="Jost-Medium" size="large" text="Today's tasks" />
        <ReturnButton disabled />
      </Navbar>
      <TasksWrapper>
        {todayTasks.map((task, index) => (
          <Task
            key={index}
            header={task.header}
            content={task.content}
            isChecked={task.isChecked}
            from={task.from}
            till={task.till}
            tasks={task.tasks}
          />
        ))}
      </TasksWrapper>
      <Footer>
        <FooterMainInfo>
          <Text color="#363636" fontFamily="Jost-Medium" size="small" text={`done tasks (${0})`} />
          <ArrowDown onPress={() => console.log('arrow down')}>
            <SvgXml xml={Icons["down arrow"]} />
          </ArrowDown>
        </FooterMainInfo>
        <AddTask onPress={() => console.log('add task')}>
          <SvgXml xml={Icons["white plus"]} />
        </AddTask>
      </Footer>
    </Wrapper>
  )
}