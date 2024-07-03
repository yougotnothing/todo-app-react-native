import styled from "styled-components/native";
import { SvgXml } from "react-native-svg";
import Text from "./Text";
import { useEffect, useRef, useState } from "react";
import Icons from "@icons";
import { TouchableWithoutFeedback, View } from "react-native";

interface TaskProps {
  header: string;
  content: string;
  isChecked: boolean;
  from?: string;
  till?: string;
  tasks?: Array<{ isChecked: boolean, content: string }>;
}

interface TodoActionProps {
  $isOpen?: boolean;
  $isActive?: boolean;
}

const TaskWrapper = styled.View`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 16px;
  gap: 20px;
  align-items: center;
  margin-bottom: 24px;
`;

const Wrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: white;
  justify-content: space-between;
  align-items: center;
`;

const MainSection = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  position: relative;
`;

const TimeWrapper = styled.View`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const TextWrapper = styled.View`
  display: flex;
  flex-direction: column;
  max-width: 160px;
  align-items: flex-start;
  gap: 5px;
`;

const Checkbox = styled.TouchableOpacity`
  background-color: transparent;
  border-radius: 24px;
  width: 24px;
  height: 24px;
  border: 1px solid #E7E7E7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Settings = styled.TouchableOpacity`
  background-color: transparent;
  width: 24px;
  height: 24px;
  border: 1px solid #E7E7E7;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  position: relative;
`;

const ChildTask = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const ChildTasksWrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 60%;
  align-self: center;
`;

const SmallCheckbox = styled.TouchableOpacity`
  background-color: transparent;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  border: 1px solid #E7E7E7;
  display: flex;
  align-items: center;
  justify-content: center;  
`;

const TodoActions = styled.View<TodoActionProps>`
  display: ${({ $isOpen }) => $isOpen ? 'flex' : 'none'};
  flex-direction: column;
  padding: 6px;
  border-radius: 9px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  background-color: white;
  position: absolute;
  gap: 4px;
  top: 0;
  right: 0;
`;

const TodoAction = styled.TouchableOpacity<TodoActionProps>`
  background-color: ${({ $isActive }) => $isActive ? '#646FD4' : 'transparent'};
  border-radius: 6px;
  width: 100%;
  padding: 2px 14px;
  color: ${({ $isActive }) => $isActive ? 'white' : '#363636'};
`;

function Task({ header, content, isChecked, from, till, tasks }: TaskProps) {
  const [isTaskChecked, setIsTaskChecked] = useState<boolean>(isChecked);
  const [isChildrenChecked, setIsChildrenChecked] = useState<boolean[]>(Array(tasks?.length).fill(false));
  const [isActionsOpen, setIsActionsOpen] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean[]>(Array(3).fill(false));
  const todoActionsRef = useRef<View>(null);

  const handleSetIsActive = (index: number, value: boolean) => { 
    setIsActive(prevState => {
      const newState = [...prevState];
      newState[index] = value;
      return newState;
    });
  }

  const todoActionPress = (index: number) => {
    return {
      onPressIn: () => handleSetIsActive(index, true),
      onPressOut: () => {
        handleSetIsActive(index, false);
        setIsActionsOpen(false);
      },
      onLongPress: () => handleSetIsActive(index, true),
      onLongPressOut: () => {
        handleSetIsActive(index, false);
        setIsActionsOpen(false);
      },
    }
  }
  
  const handleSetChidrenChecked = (index: number) => {
    setIsChildrenChecked(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  }

  useEffect(() => {
    if(tasks) {
      setIsChildrenChecked(prevState => {
        const newState = [...prevState];
        newState.forEach((item, index) => newState[index] = tasks[index].isChecked);
        return newState;
      });
    }
  }, [tasks]);

  return (
    <TaskWrapper>
      <Wrapper>
        <MainSection>
          <TimeWrapper>
            <Text color="#888888" fontFamily="Jost-Regular" size="small" text={from} />
            <Text color="#888888" fontFamily="Jost-Regular" size="small" text={till} />
          </TimeWrapper>
          <Checkbox onPress={() => setIsTaskChecked(!isTaskChecked)}>
            {isTaskChecked && (
              <SvgXml xml={Icons["checkbox"]} />
            )}
          </Checkbox>
          <TextWrapper>
            <Text color="#363636" fontFamily="Jost-Medium" size="small" text={header} />
            <Text color="#E7E7E7" fontFamily="Jost-Regular" size="small" text={content} />
          </TextWrapper>
        </MainSection>
        <Settings onPress={() => setIsActionsOpen(true)}>
          <SvgXml xml={Icons["three dots"]} />
        </Settings>
          <TodoActions $isOpen={isActionsOpen} forwardedAs={View} ref={todoActionsRef}>
            <TodoAction activeOpacity={1} $isActive={isActive[0]} {...todoActionPress(0)}>
              <Text color={isActive[0] ? 'white' : '#363636'} size="small" fontFamily="Jost-Regular" text="add subtasks" />
            </TodoAction>
            <TodoAction activeOpacity={1} $isActive={isActive[1]} {...todoActionPress(1)}>
              <Text color={isActive[1] ? 'white' : '#363636'} size="small" fontFamily="Jost-Regular" text="edit tasks" />
            </TodoAction>
            <TodoAction activeOpacity={1} $isActive={isActive[2]} {...todoActionPress(2)}>
              <Text color={isActive[2] ? 'white' : '#363636'} size="small" fontFamily="Jost-Regular" text="delete tasks" />
            </TodoAction>
          </TodoActions>
      </Wrapper>
      {tasks && (
        <ChildTasksWrapper>
          {tasks.map((item, index) => (
            <ChildTask key={index}>
              <SmallCheckbox onPress={() => handleSetChidrenChecked(index)}>
                {isChildrenChecked[index] && <SvgXml height="20" width="20" xml={Icons["checkbox"]} />}
              </SmallCheckbox>
              <Text color="#363636" fontFamily="Jost-Regular" size="small" text={item.content} />
            </ChildTask>
          ))}
        </ChildTasksWrapper>
      )}
    </TaskWrapper>
  );
}

export default Task;