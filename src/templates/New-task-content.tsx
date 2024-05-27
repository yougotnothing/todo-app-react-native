import { observer } from "mobx-react";
import { createTaskModal } from "@store/create-task-modal.mobx";
import styled from "styled-components/native";

const TextArea = styled.TextInput`
  background-color: white;
  border-radius: 14px;
  padding: 8px 16px;
  font-size: 17px;
  height: 48px;
  width: 80%;
  color: #888888;
  position: relative;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
`;

function NewTaskContent() {
  return (
    <TextArea
      placeholderTextColor="#D9D9D9"
      placeholder="Add content"
      onChange={(event) => createTaskModal.setContent(event.nativeEvent.text)}
      value={createTaskModal.content}
    />
  );
}

export default observer(NewTaskContent);