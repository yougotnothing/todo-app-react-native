import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import Text from "./Text";
import styled from "styled-components/native";

interface TransparentButtonProps {
  onPress: () => unknown;
  text: string;
  style?: StyleProp<ViewStyle>;
}

const Button = styled.TouchableOpacity`
  background-color: transparent;
`;

export const TransparentButton = ({ onPress, text, ...style }: TransparentButtonProps) => {
  return (
    <Button onPress={onPress} {...style}>
      <Text color="#242F9B" size="medium" fontFamily="Jost-Regular" text={text} />
    </Button>
  );
};
