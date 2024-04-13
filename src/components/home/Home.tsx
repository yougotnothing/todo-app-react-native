import { useNavigation } from "@react-navigation/native";
import { Container, DrawerButton, Header, Input, InputWrapper, LeftCircle, MainSection, Navbar, ProfileButton, RightCircle, SearchIcon, Task, TasksWrapper, TextWrapper, TimeButton, TimeWrapper, TodoButton, TodoButtonCounter, TodoButtonsWrapper } from "./Home.styled";
import Text from "../../templates/components/Text";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../api/axios.config";
import { TodoDto } from "../../dto/todo.dto";
import { SvgXml } from "react-native-svg";
import Icons from "../../config/enum/icons.enum";
import { handleGetUser } from "../authentication/functions";
import { UserDto } from "../../dto/user.dto";

export default function Home() {
  const [user, setUser] = useState<UserDto | null>(null); 
  const [tasks, setTasks] = useState<TodoDto[]>([]);
  const { openDrawer, navigate } = useNavigation<any>();

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
    }catch(error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    handleGetTasks();
    handleGetUser(setUser);

    console.log('user: ', user);
  }, []);

  return (
    <Container>
      <Header>
        <LeftCircle>
          <SvgXml xml={Icons["right circle"]}
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
          <DrawerButton onPress={openDrawer}>
            <SvgXml
              xml={Icons["menu"]}
              height="30"
              width="30"
            />
          </DrawerButton>
          <Text color="white" fontFamily="Jost-Medium" size="large" text="Mtodo logo" />
          <ProfileButton
            $isHaveAvatar={user && user.isHaveAvatar}
            $avatar={user && user.avatar}
          />
        </Navbar>
        <TextWrapper>
          <Text color="#363636" fontFamily="Jost-Medium" size="medium" text="you have" />
          <Text color="white" fontFamily="Jost-Medium" size="large" text={`${tasks.length} tasks`} />
          <Text color="#363636" fontFamily="Jost-Medium" size="medium" text="today!" />
          <Text
            color="#363636"
            fontFamily="Jost-Medium"
            size="medium"
            text={new Date().toLocaleDateString(
              'en-US',
              { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
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
            <TimeButton key={index}>
              <Text color="#7D7D7D" fontFamily="Jost-Regular" size="small" text={item} />
            </TimeButton>
          ))}
        </TimeWrapper>
        <TodoButtonsWrapper>
          {["school", "work", "shop", "read", "work out", undefined].map((item, index) => (
            <TodoButton key={index} $type={item}>
              <SvgXml xml={Icons[`${item} task` as keyof typeof Icons]} />
              <TodoButtonCounter $type={item}>{index}</TodoButtonCounter>
              {item && (
                <Text color={item ? "white" : "#D25EB0"} fontFamily="Jost-Medium" size={item ? 'medium' : 'large'} text={item ? item : ""} />
              )}
            </TodoButton>
          ))}
        </TodoButtonsWrapper>
      </MainSection>
    </Container>
  )
}
