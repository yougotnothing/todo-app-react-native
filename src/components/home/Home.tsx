import { DrawerActions, useNavigation } from "@react-navigation/native";
import {
  Container,
  DrawerButton,
  Header,
  Input,
  InputWrapper,
  LeftCircle,
  MainSection,
  Navbar,
  ProfileButton,
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
import { useEffect } from "react";
import { SvgXml } from "react-native-svg";
import Icons from "@icons";
import { tasks } from "@store/tasks.mobx";
import { user } from "@store/user.mobx";
import NewTask from "@templates/New-task";
import { createTaskModal } from "@store/create-task-modal.mobx";

export default function Home() {
  const { navigate, dispatch } = useNavigation<any>();

  const handleNavigate = (type?: string) => {
    if(!type) {
      createTaskModal.open();
    }else navigate(`${type} tasks`);
  }

  useEffect(() => {
    tasks.getTasksByType('school');
    user.getUser();

    console.log('todos', tasks.todos);
    console.log('user: ', user);
  }, []);

  return (
    <Container>
      <NewTask isOpen={createTaskModal.isOpen}  />
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
          <DrawerButton onPress={() => dispatch(DrawerActions.openDrawer())}>
            <SvgXml
              xml={Icons["menu"]}
              height="30"
              width="30"
            />
          </DrawerButton>
          <Text color="white" fontFamily="Jost-Medium" size="large" text="Mtodo logo" />
          {user && user.isHaveAvatar ? (
            <ProfileButton
              $isHaveAvatar={user && user.isHaveAvatar}
              $avatar={user && user.avatar}
            />
          ) : (
            <SvgXml xml={Icons["default avatar"]} width="40" height="40" />
          )}
        </Navbar>
        <TextWrapper>
          <Text color="#363636" fontFamily="Jost-Medium" size="medium" text="you have" />
          <Text color="white" fontFamily="Jost-Medium" size="large" text={`${tasks.todayTasks.length} tasks`} />
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
            <TimeButton key={index} onPress={() => navigate(`${item} tasks`)}>
              <Text color="#7D7D7D" fontFamily="Jost-Regular" size="small" text={item} />
            </TimeButton>
          ))}
        </TimeWrapper>
        <TodoButtonsWrapper>
          {["School", "Work", "Shop", "Read", "Work out", undefined].map((item, index) => (  
            <TodoButton key={index} $type={item?.toLowerCase()} onPress={() => handleNavigate(item)}>
              <SvgXml xml={Icons[`${item?.toLowerCase()} task` as keyof typeof Icons]} />
              <TodoButtonCounter $type={item}>{index}</TodoButtonCounter>
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