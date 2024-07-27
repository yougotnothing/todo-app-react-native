import { SvgXml } from "react-native-svg";
import {
  AddTask,
  ArrowDown,
  Circle,
  Footer,
  FooterMainInfo,
  Navbar,
  ReturnButton,
  TasksWrapper,
  Wrapper
} from "./Tasks.styled";
import Icons from "@icons";
import Task from "src/templates/Task";
import { useNavigation } from "@react-navigation/native";
import Text from "src/templates/Text";
import { useEffect } from "react";
import { tasksPages } from "@store/tasks-pages";
import { observer } from "mobx-react";
import { tasks as tasksStore } from "@store/tasks";
import { RouterProps } from "router/router.interface";
import { Tasks, UserTasks } from "dto/todo";
import NewTask from "@templates/New-task/New-task";
import { createTaskModal } from "@store/create-task-modal";

function TodayTasks() {
  const navigation = useNavigation<RouterProps>();

  useEffect(() => {
    tasksStore.getTasks(tasksPages.type.toLowerCase() as "today" | "week" | "month");
  }, []);

  return (
    <>
      <NewTask />
      <Wrapper>
        <Circle $left={0}>
          <SvgXml width={250} height={250} xml={Icons["right circle"]} />
        </Circle>
        <Circle $right={0} $top={0}>
          <SvgXml xml={Icons["bottom circle"]} />
        </Circle>
        <Navbar>
          <ReturnButton onPress={() => navigation.navigate('Home')}>
            <SvgXml xml={Icons["white back button"]} />
          </ReturnButton>
          <Text
            color="white"
            fontFamily="Jost-Medium"
            size="large"
            text={navigation.getState().routes[1].name}
          />
          <ReturnButton disabled />
        </Navbar>
        <TasksWrapper>
          {tasksPages.tasks
          && tasksPages.type
          !== "Today"
          && tasksPages.type
          !== "Week"
          && tasksPages.type
          !== "Month"
          ? (
            Array.isArray(
              tasksStore.userTasks[tasksPages.type.toLowerCase() as keyof UserTasks]
            ) && tasksStore.userTasks[tasksPages.type.toLowerCase() as keyof UserTasks].length ?
            tasksStore.userTasks[tasksPages.type.toLowerCase() as keyof UserTasks].map((task, index) => (
              <Task
                onPressCheckbox={() => tasksStore.changeTaskIsChecked(task, !task.isChecked, tasksPages.type as keyof UserTasks)}
                key={index}
                header={task.header}
                content={task.content}
                isChecked={task.isChecked}
                from={task.from}
                till={task.till}
                tasks={task.tasks}
              />
            )) : (
              <Text
                color="#363636"
                fontFamily="Jost-Medium"
                size="large"
                text={`you have no ${tasksPages.type} tasks`}
              />
            )
          ) : (
            Array.isArray(
              tasksStore.tasks[tasksPages.type.toLowerCase() as keyof Tasks]
            ) && tasksStore.tasks[tasksPages.type.toLowerCase() as keyof Tasks].length ?
            tasksStore.tasks[tasksPages.type.toLowerCase() as keyof Tasks].map((task, index) => (
              <Task
                onPressCheckbox={
                  () => tasksStore.changeTaskIsChecked(
                                    task,
                                    !task.isChecked,
                                    tasksPages.type as keyof Tasks
                                  )
                }
                key={index}
                header={task.header}
                content={task.content}
                isChecked={task.isChecked}
                from={task.from}
                till={task.till}
                tasks={task.tasks}
              />
            )) : (
              <Text
                color="#363636"
                fontFamily="Jost-Medium"
                size="large"
                text={`you have no ${tasksPages.type} tasks`}
              />
            )
          )}
        </TasksWrapper>
        <Footer>
          <FooterMainInfo>
            <Text color="#363636" fontFamily="Jost-Medium" size="small" text={`done tasks (${0})`} />
            <ArrowDown onPress={() => console.log('arrow down')}>
              <SvgXml xml={Icons["down arrow"]} />
            </ArrowDown>
          </FooterMainInfo>
          <AddTask onPress={() => createTaskModal.open('till from')}>
            <SvgXml xml={Icons["white plus"]} />
          </AddTask>
        </Footer>
      </Wrapper>
    </>
  )
};

export default observer(TodayTasks);