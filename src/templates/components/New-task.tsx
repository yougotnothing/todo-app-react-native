import styled from "styled-components/native";
import Text from "./Text";
import { observer } from "mobx-react";
import { Modal, TouchableWithoutFeedback } from "react-native";
import { useEffect, useRef } from "react";
import { createTaskModal } from "@store/create-task-modal.mobx";

interface NewTaskProps {
  $isOpen?: boolean;
}

interface TaskProps {
  $type: "new task" | "edit task";
}

const Wrapper = styled.View<NewTaskProps>`
  display: ${({ $isOpen }) => $isOpen ? 'flex' : 'none'};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: rgba(44, 44, 44, 0.406);
  position: absolute;
  right: 0;
  top: 0;
  z-index: 998;
`;

const TaskWrapper = styled.View`
  display: flex;
  flex-direction: column;
  padding: 14px;
  border-radius: 16px;
  gap: 20px;
  align-items: center;
  background-color: white;
  height: 450px;
  width: 87%;
  margin-bottom: 24px;
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

function NewTask() {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={createTaskModal.isOpen}
    >
      <Wrapper $isOpen={createTaskModal.isOpen}>
      <CloseModal onPress={() => createTaskModal.close()}></CloseModal>
        <TaskWrapper>
          <Header>
            <Text color="#363636" fontFamily="Jost-Medium" size="small" text="New task" />
            <Text color="#363636" fontFamily="Jost-Medium" size="small" text="Add a new task" />
          </Header>
        </TaskWrapper>
      </Wrapper>
    </Modal>
  )
}

export default observer(NewTask);