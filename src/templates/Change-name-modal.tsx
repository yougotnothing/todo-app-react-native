import { BlurView } from "expo-blur";
import { observer } from "mobx-react";
import { ReactNode, useState } from "react";
import styled from "styled-components/native";

interface ModalProps {
  isModalVisible: boolean;
  children: ReactNode;
}

const PressableButton = styled.Pressable`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 90%;
  height: auto;
  background-color: white;
  border-radius: 18px;
  padding: 20px;
`;

const ChangeNameModal = ({ isModalVisible, children }: ModalProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(isModalVisible);

  return (
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
      <PressableButton onPress={() => setIsVisible(false)} />
      <Wrapper>{children}</Wrapper>
    </BlurView>
  );
}

export default observer(ChangeNameModal);