import { SvgXml } from "react-native-svg";
import { AddTask, ArrowDown, Circle, Footer, FooterMainInfo, Navbar, ReturnButton, TasksWrapper, Wrapper } from "./Today-tasks.styled";
import Icons from "@icons";
import Task from "src/templates/Task";
import { useNavigation } from "@react-navigation/native";
import Text from "src/templates/Text";
import { useEffect, useState } from "react";
import { api } from "axios-config";
import { tasksPages } from "@store/tasks-pages.mobx";
import { observer } from "mobx-react";
import { tasks } from "@store/tasks.mobx";

const TodayTasks = observer(() => {
  const { navigate, dispatch } = useNavigation<any>();

  useEffect(() => {
    tasks.getTasks(tasksPages.type.toLowerCase() as "today" | "week" | "month");
    console.log(tasks.todayTasks);
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
        <Text
          color="white"
          fontFamily="Jost-Medium"
          size="large"
          text={`${tasksPages.type} tasks`}
        />
        <ReturnButton disabled />
      </Navbar>
      <TasksWrapper>
        {tasks.todayTasks.map((task, index) => (
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
});

export default TodayTasks;