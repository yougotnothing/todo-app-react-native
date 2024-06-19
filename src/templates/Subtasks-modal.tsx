import { createTaskModal } from "@store/create-task-modal";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import styled from "styled-components/native";
import AddButton from "./Add-button";
import { SvgXml } from "react-native-svg";
import Icons from "@icons";
import { TextInputProps } from "react-native";

const Subtask = styled.View`
  display: flex;
  padding: 5px 10px;
  border-radius: 6px;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const IsChecked = styled.TouchableOpacity`
  background-color: transparent;
  border-radius: 24px;
  border: 1px solid #888888;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

const Subtasks = styled.ScrollView`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
`;

const Content = styled.TextInput`
  background-color: transparent;
  color: #888888;
`;

function SubtasksModal({ ...props }: TextInputProps) {

  useEffect(() => {
    console.log('tasks: ', createTaskModal.tasks);
  }, [createTaskModal.tasks]);
  

  return (
    <>
      <Subtasks>
        {createTaskModal.tasks.map((item, index) => (
          <Subtask key={index}>
            <IsChecked onPress={() => createTaskModal.setTaskIsChecked(!item.isChecked, index)}>
              {item.isChecked && <SvgXml xml={Icons["checkbox"]} />}
            </IsChecked>
            <Content
              {...props}
              placeholderTextColor="#D9D9D9"
              placeholder="Enter subtask"
              value={item.content}
              onChangeText={(text) => createTaskModal.setTaskContent(text, index)}
            />
          </Subtask>
        ))}
      </Subtasks>
      <AddButton onPress={() => createTaskModal.addSubtask()} />
    </>
  )
}

export default observer(SubtasksModal);