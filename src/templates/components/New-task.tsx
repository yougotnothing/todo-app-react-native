import styled from "styled-components/native";
import Text from "./Text";
import { observer } from "mobx-react";
import { Modal } from "react-native";
import { createTaskModal } from "@store/create-task-modal.mobx";
import { SvgXml } from "react-native-svg";
import { BlurView } from "expo-blur";
import Icons from "@icons";
import DateTimePicker from "react-native-modal-datetime-picker";
import { useState } from "react";
import { TransparentButton } from "./Transparent-button";

const TaskWrapper = styled.View`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 16px;
  gap: 35px;
  align-items: center;
  background-color: white;
  height: 290px;
  width: 80%;
  margin-bottom: 24px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 9999;
`;

const Header = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const CloseModal = styled.TouchableOpacity`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 9999;
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

function NewTask() {
  const [isFromOpen, setIsFromOpen] = useState<boolean>(false);
  const [isTillOpen, setIsTillOpen] = useState<boolean>(false);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={createTaskModal.isOpen}
    >
      <BlurView intensity={30} style={{
        display: createTaskModal.isOpen ? 'flex' : 'none',
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        backgroundColor: "transparent",
        position: "absolute",
        right: 0,
        top: 0,
        zIndex: 998
      }}>
      <CloseModal onPress={() => createTaskModal.close()}></CloseModal> 
        <TaskWrapper>
          <Header>
            <Text color="#363636" fontFamily="Jost-Medium" size="small" text="Add a new task" />
            <ImportantButton onPress={() => createTaskModal.setImportant(!createTaskModal.important)}>
              <SvgXml xml={Icons[`important ${createTaskModal.important ? "enabled" : "disabled"}`]} />
            </ImportantButton>
          </Header>
          <TillFromWrapper>
            <TillFrom>
              <Text color="#888888" size="small" fontFamily="Jost-Regular" text="from" />
              <TillFromButton onPress={() => setIsFromOpen(true)}>
                <Text color="#888888" size="small" fontFamily="Jost-Regular" text={createTaskModal.from} />
              </TillFromButton>
            </TillFrom>
            <TillFrom>
              <Text color="#888888" size="small" fontFamily="Jost-Regular" text="till" />
              <TillFromButton onPress={() => setIsFromOpen(true)}>
                <Text color="#888888" size="small" fontFamily="Jost-Regular" text={createTaskModal.till} />
              </TillFromButton>
            </TillFrom>
            <DateTimePicker
              isVisible={isFromOpen}
              onConfirm={time => createTaskModal.setFrom(time.toLocaleTimeString())}
              onCancel={() => setIsFromOpen(false)}
              mode="time"
              date={new Date()}
            />
            <DateTimePicker
              isVisible={isTillOpen}
              onConfirm={time => createTaskModal.setTill(time.toLocaleTimeString())}
              onCancel={() => setIsTillOpen(false)}
              mode="time"
              date={new Date()}
            />
          </TillFromWrapper>
          <Footer>
            <TransparentButton onPress={() => createTaskModal.setIsOpen(false)} text="Cancel" />
            <TransparentButton onPress={() => console.log('add task')} text="Ok" />
          </Footer>
        </TaskWrapper>
      </BlurView>
    </Modal>
  )
}

export default observer(NewTask);