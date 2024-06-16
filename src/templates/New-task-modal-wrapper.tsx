import { BlurView } from "expo-blur";
import { observer } from "mobx-react";
import { Modal, Platform } from "react-native";
import styled from "styled-components/native";
import { shadowStyle } from "./styles/shadow";

interface WrapperProps {
  isVisible: boolean;
  children: React.ReactNode;
  onPressOutside: () => void;
}

const PressableButton = styled.Pressable`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const TaskWrapper = styled.View`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 16px;
  gap: 35px;
  width: 90%;
  align-items: flex-start;
  align-items: center;
  background-color: white;
  height: 520px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

function Wrapper({ children, isVisible, onPressOutside }: WrapperProps) {
  
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
    >
      <BlurView
        experimentalBlurMethod="dimezisBlurView"
        intensity={30} style={{
        display: isVisible ? 'flex' : 'none',
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
        <PressableButton onPress={onPressOutside} />
        <TaskWrapper style={
          Platform.OS === 'android' && shadowStyle(14, "#000")
        }>{children}</TaskWrapper>
      </BlurView>
    </Modal>
  )
};

export default observer(Wrapper);