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
} from "./Today-tasks.styled";
import Icons from "@icons";
import Task from "src/templates/Task";
import { useNavigation } from "@react-navigation/native";
import Text from "src/templates/Text";
import { useEffect } from "react";
import { tasksPages } from "@store/tasks-pages";
import { observer } from "mobx-react";
import { tasks, tasks as tasksStore } from "@store/tasks";
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
            text={`${tasksPages.type} tasks`}
          />
          <ReturnButton disabled />
        </Navbar>
        <TasksWrapper>
          {tasksPages.tasks && tasksPages.type !== "Today" && tasksPages.type !== "Week" && tasksPages.type !== "Month" ? (
            tasksStore.userTasks[tasksPages.type.toLowerCase() as keyof UserTasks].map((task, index) => (
              <Task
                key={index}
                header={task.header}
                content={task.content}
                isChecked={task.isChecked}
                from={task.from}
                till={task.till}
                tasks={task.tasks}
              />
            ))
          ) : (
            tasksStore.tasks[tasksPages.type.toLowerCase() as keyof Tasks].map((task, index) => (
              <Task
                key={index}
                header={task.header}
                content={task.content}
                isChecked={task.isChecked}
                from={task.from}
                till={task.till}
                tasks={task.tasks}
              />
            ))
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