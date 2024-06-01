import React, {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useEffect
} from "react";
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import styled from "styled-components/native";

interface OptionsDroplistWrapperProps {
  $isOpen: boolean;
}

interface OptionsDroplistProps extends OptionsDroplistWrapperProps {
  children?: ReactNode;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const OptionsDroplistWrapper = styled(Animated.View)<OptionsDroplistWrapperProps>`
  position: absolute;
  opacity: ${({ $isOpen }) => $isOpen ? 1 : 0};
  top: ${({ $isOpen }) => $isOpen ? '120px': '-20px'};
  right: ${({ $isOpen }) => $isOpen ? '20px' : '-20px'};
  z-index: 999;
  padding: 20px;
  justify-content: space-between;
  background-color: #ffffff;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: all 0.2s ease;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.556);
`;

const Overlay = styled.Pressable`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
`;

const OptionsDroplist: FC<OptionsDroplistProps> = ({ $isOpen, children, setIsOpen }) => {
  const opacity = useSharedValue($isOpen ? 1 : 0);
  const top = useSharedValue($isOpen ? 120 : -20);
  const right = useSharedValue($isOpen ? 20 : -20);
  const width = useSharedValue($isOpen ? 200 : 0)
  const height = useSharedValue($isOpen ? 250 : 0);

  useEffect(() => {
    opacity.value = withTiming(
      $isOpen ? 1 : 0,
      {
        duration: 520,
        easing: Easing.elastic(1.2),
        reduceMotion: ReduceMotion.System
      }
    );
    top.value = withTiming(
      $isOpen ? 120 : -20,
      {
        duration: 520,
        easing: Easing.elastic(1.2),
        reduceMotion: ReduceMotion.System
      }
    );
    right.value = withTiming(
      $isOpen ? 20 : -20, 
      {
        duration: 520,
        easing: Easing.elastic(1.2),
        reduceMotion: ReduceMotion.System
      }
    );
    width.value = withTiming(
      $isOpen ? 200 : 0,
      {
        duration: 520,
        easing: Easing.elastic(1.2),
        reduceMotion: ReduceMotion.System
      }
    );
    height.value = withTiming(
      $isOpen ? 250 : 0,
      {
        duration: 520,
        easing: Easing.elastic(1.2),
        reduceMotion: ReduceMotion.System
      }
    );
  }, [$isOpen]);
  
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    top: top.value,
    right: right.value,
    width: width.value,
    height: height.value
  }));

  return (
    <>
      {$isOpen && (<Overlay onPress={() => setIsOpen(false)} />)}
      <OptionsDroplistWrapper style={animatedStyle} $isOpen={$isOpen}>
        {children}
      </OptionsDroplistWrapper>
    </>
  );
};

export default OptionsDroplist;