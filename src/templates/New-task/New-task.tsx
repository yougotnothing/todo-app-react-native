import styled from "styled-components/native";
import Text from "@templates/Text";
import { observer } from "mobx-react";
import { createTaskModal } from "@store/create-task-modal";
import { SvgXml } from "react-native-svg";
import Icons from "@icons";
import { useEffect, useState } from "react";
import TransparentButton from "@templates/Transparent-button";
import DatePicker from "./Date-picker";
import SubtasksModal from "@templates/Subtasks-modal";
import ModalWrapper from "@templates/Modal-wrapper";
import Animated, { Easing, ReduceMotion, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const Header = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const ImportantButton = styled.TouchableOpacity`
  background-color: transparent;
  width: 32px;
  height: 32px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TillFromWrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  width: 100%;
`;

const TillFrom = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 110px;
  justify-content: space-between;
`;

const TillFromButton = styled.TouchableOpacity`
  background-color: white;
  border: none;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 20px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`;

const Footer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 24px;
  margin: auto 0 0 auto;
`;

const Input = styled.TextInput`
  background-color: white;
  border-radius: 14px;
  padding: 8px 16px;
  font-size: 17px;
  height: 48px;
  width: 100%;
  color: #888888;
  position: relative;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
`;

const Wrapper = styled(Animated.View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  gap: 35px;
  max-height: 530px;
  background-color: white;
  border-radius: 18px;
  padding: 20px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

function NewTask() {
  const [isFromOpen, setIsFromOpen] = useState<boolean>(false);
  const [isTillOpen, setIsTillOpen] = useState<boolean>(false);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const wrapperTop = useSharedValue<number>(isInputFocused ? -100 : 0);

  useEffect(() => {
    wrapperTop.value = isInputFocused ? -100 : 0;
  }, [isInputFocused]);

  const wrapperStyle = useAnimatedStyle(() => ({
    top: withTiming(wrapperTop.value, {
      duration: 400,
      easing: Easing.elastic(1.2),
      reduceMotion: ReduceMotion.System
    })
  }));

  return (
    <ModalWrapper
      type="new task"
      isModalVisible={createTaskModal.isTillFromModalOpen}
      onPressOutside={() => createTaskModal.close("till from")}
    >
      <Wrapper style={wrapperStyle}>
      <Header>
        <Text color="#363636" fontFamily="Jost-Medium" size="small" text="Add a new task" />
        <ImportantButton onPress={() => createTaskModal.setImportant(!createTaskModal.important)}>
          <SvgXml xml={Icons[`important ${createTaskModal.important ? "enabled" : "disabled"}`]} />
        </ImportantButton>
      </Header>
      <Input
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
        placeholder="Task header"
        textContentType="none"
        placeholderTextColor="#888888"
        onChange={(event) => createTaskModal.setHeader(event.nativeEvent.text)}
        value={createTaskModal.header}
      />
      <TillFromWrapper>
        <TillFrom>
          <Text color="#888888" size="small" fontFamily="Jost-Regular" text="from" />
          <TillFromButton onPress={() => setIsFromOpen(true)}>
            <Text color="#888888" size="small" fontFamily="Jost-Regular" text={createTaskModal.from} />
          </TillFromButton>
        </TillFrom>
        <TillFrom>
          <Text color="#888888" size="small" fontFamily="Jost-Regular" text="till" />
          <TillFromButton onPress={() => setIsTillOpen(true)}>
            <Text color="#888888" size="small" fontFamily="Jost-Regular" text={createTaskModal.till} />
          </TillFromButton>
        </TillFrom>
        <DatePicker
          type="from"
          isVisible={isFromOpen}
          onCancel={() => setIsFromOpen(false)}
        />
        <DatePicker
          type="till"
          isVisible={isTillOpen}
          onCancel={() => setIsTillOpen(false)}
        />
      </TillFromWrapper>
      <SubtasksModal onFocus={() => setIsInputFocused(true)} onBlur={() => setIsInputFocused(false)} />
      <Footer>
        <TransparentButton onPress={() => createTaskModal.clear()} text="Cancel" />
        <TransparentButton onPress={() => createTaskModal.createTask()} text="Ok" />
      </Footer>
    </Wrapper>
    </ModalWrapper>
  )
}

export default observer(NewTask);