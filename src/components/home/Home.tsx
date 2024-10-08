import { DrawerActions, useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  Container,
  Header,
  LeftCircle,
  MainSection,
  RightCircle,
  TextWrapper, 
  TimeButton,
  TimeWrapper,
  TodoButton,
  TodoButtonCounter,
  TodoButtonsWrapper
} from "./Home.styled";
import Text from "@templates/Text";
import { useCallback, useEffect, useState } from "react";
import { SvgXml } from "react-native-svg";
import Icons from "@icons";
import { tasks } from "@store/tasks";
import { user } from "@store/user";
import { createTaskModal } from "@store/create-task-modal";
import { observer } from "mobx-react";
import { tasksPages } from "@store/tasks-pages";
import { TaskType, UserTasks } from "dto/todo";
import { RouterProps } from "router/router.interface";
import UserAvatar from "@templates/User-avatar";
import DrawerMenuButton from "@templates/Drawer-menu-button";
import { DATE_CONFIG } from "@config/date";
import { Platform } from "react-native";
import { shadowStyle } from "@templates/styles/shadow";
import TasksInput from "@animated/Tasks-input";
import Navbar from "@templates/Navbar";
import MessageModal from "@animated/Message-modal";
import NewTask from "@templates/New-task/New-task";

function Home() {
  const [date, setDate] = useState<string>(new Date().toLocaleDateString('en-US', DATE_CONFIG));
  const navigation = useNavigation<RouterProps>();

  useFocusEffect(
    useCallback(() => {
      user.getAvatar();
    }, [user])
  );

  useEffect(() => {
    const interval = setInterval(() => {
      tasks.getTodayTasks();
      setDate(new Date().toLocaleDateString('en-US', DATE_CONFIG));
    }, 60000);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    tasks.getTasksLength();
  }, []);

  const handlePressTodoButton = async (type: TaskType | undefined) => {
    if(type) {
      tasksPages.setType(type);
      createTaskModal.setType(type.toLowerCase() as TaskType);
      await tasksPages.getTasksByType(type);
      navigation.navigate(`${type} tasks`);

      console.log('type: ', createTaskModal.type);
    }else createTaskModal.open("till from");
  };

  return (
    <Container>
      <NewTask />
      <Header>
        <LeftCircle>
          <SvgXml 
            xml={Icons["right circle"]}
            width="250"
            height="250"
          />
        </LeftCircle>
        <RightCircle>
          <SvgXml
            xml={Icons["left circle"]}
            width="320"
            height="320"
          />
        </RightCircle>
        <Navbar
          header="Mtodo logo"
          buttons={[
            <DrawerMenuButton onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />,
            <UserAvatar user={user} size={40} onPress={() => navigation.navigate('Profile')} />
          ]}
        />
        <MessageModal />
        <TextWrapper>
          <Text color="#363636" fontFamily="Jost-Medium" size="medium" text="you have" />
          <Text color="white" fontFamily="Jost-Medium" size="large" text={`${tasks.tasks["today"].length} tasks`} />
          <Text color="#363636" fontFamily="Jost-Medium" size="medium" text="today!" />
          <Text color="#363636" fontFamily="Jost-Medium" size="medium" text={date} />
        </TextWrapper>
      </Header>
      <TasksInput />
      <MainSection>
        <TimeWrapper>
          {["Today", "Week", "Month"].map((item, index) => (
            <TimeButton
              key={index}
              onPress={() => {
                tasksPages.setType(item as "Today" | "Week" | "Month"); 
                navigation.navigate(`${item} tasks`);
              }}>
              <Text color="#7D7D7D" fontFamily="Jost-Regular" size="small" text={item} />
            </TimeButton>
          ))}
        </TimeWrapper>
        <TodoButtonsWrapper>
          {["School", "Work", "Shop", "Read", "Work out", undefined].map((item, index) => (  
            <TodoButton
              style={Platform.OS === 'android' && shadowStyle(3, "#000")}
              key={index}
              $type={item?.toLowerCase()}
              onPress={async () => await handlePressTodoButton(item as TaskType | undefined)}
            >
              <SvgXml xml={Icons[`${item?.toLowerCase()} task` as keyof typeof Icons]} />
              <TodoButtonCounter $type={item}>
                {item && tasks.tasksLength[item.toLowerCase() as keyof UserTasks]}
              </TodoButtonCounter>
              {item && (
                <Text
                  color={item ? "white" : "#D25EB0"}
                  fontFamily="Jost-Medium"
                  size={item ? 'medium' : 'large'}
                  text={item ? item : ""}
                />
              )}
            </TodoButton>
          ))}
        </TodoButtonsWrapper>
      </MainSection>
    </Container>
  )
}

export default observer(Home);