import { DrawerActions, useNavigation, useFocusEffect, useIsFocused } from "@react-navigation/native";
import {
  Container,
  DrawerButton,
  Header,
  Input,
  InputWrapper,
  LeftCircle,
  MainSection,
  Navbar,
  RightCircle,
  SearchIcon,
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
import { tasks } from "@store/tasks.mobx";
import { user } from "@store/user.mobx";
import { createTaskModal } from "@store/create-task-modal.mobx";
import { observer } from "mobx-react";
import { tasksPages } from "@store/tasks-pages.mobx";
import CreateTask from "components/create-task/Create-task";
import { TaskType, UserTasks } from "dto/todo.dto";
import { RouterProps } from "router/router.interface";
import UserAvatar from "@templates/User-avatar";

const Home = observer(() => {
  const navigation = useNavigation<RouterProps>();

  useFocusEffect(
    useCallback(() => {
      user.getUser();
    }, [{ ...user }])
  );

  const handlePressTodoButton = async (type: TaskType | undefined) => {
    if(type) {
      tasksPages.setType(type);
      await tasksPages.getTasksByType(type);
      navigation.navigate(`${type} tasks`);
    }else createTaskModal.open("till from");
  };

  return (
    <Container>
      <CreateTask />
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
        <Navbar>
          <DrawerButton onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <SvgXml
              xml={Icons["menu"]}
              height="30"
              width="30"
            />
          </DrawerButton>
          <Text color="white" fontFamily="Jost-Medium" size="large" text="Mtodo logo" />
          <UserAvatar
            avatar={user.avatar}
            isHaveAvatar={user.isHaveAvatar}
            size={40}
            onPress={() => navigation.navigate('Profile')}
          />
        </Navbar>
        <TextWrapper>
          <Text color="#363636" fontFamily="Jost-Medium" size="medium" text="you have" />
          <Text color="white" fontFamily="Jost-Medium" size="large" text={`${tasks.tasks["today"].length} tasks`} />
          <Text color="#363636" fontFamily="Jost-Medium" size="medium" text="today!" />
          <Text
            color="#363636"
            fontFamily="Jost-Medium"
            size="medium"
            text={new Date().toLocaleDateString(
              'en-US',
              { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
            )}
          />
        </TextWrapper>
        <InputWrapper>
          <SearchIcon>
            <SvgXml xml={Icons["search"]} />
          </SearchIcon>
          <Input
            placeholderTextColor="#888888"
            placeholder="Search tasks"
          />
        </InputWrapper>
      </Header>
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
});

export default Home;