import { BlurView } from "expo-blur";
import { observer } from "mobx-react";
import { FC } from "react";
import styled from "styled-components/native";
import { Modal, Platform } from "react-native";
import { shadowStyle } from "@templates/styles/shadow";
import { ModalProps } from "@interfaces/modal";

const PressableButton = styled.Pressable`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.View`
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

function ModalWrapper({ isModalVisible, children, onPressOutside }: ModalProps) {

  return (
    <Modal
      animationType="fade"
      transparent
      visible={isModalVisible}
    >
      <BlurView
        experimentalBlurMethod="dimezisBlurView"
        intensity={30}
        style={{
          display: isModalVisible ? 'flex' : 'none',
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
        }}
      >
        <PressableButton onPress={onPressOutside} />
        <Wrapper
          style={Platform.OS === 'android' && shadowStyle(30, "black")}
        >{children}</Wrapper>
      </BlurView>
    </Modal>
  );
}

export default observer(ModalWrapper);