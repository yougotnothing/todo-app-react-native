import styled from "styled-components/native";
import { Props } from "../types/button.type";
import Text from "./Text";
import { colors } from "../colors";

const Button = styled.TouchableOpacity`
  background-color: #646FD4;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  padding: 8px 16px;
  color: #D9D9D9;
`;

export default function SignUpButton({ onPress, text }: Props) {
  return(
    <Button onPress={onPress}>
      <Text color="#D9D9D9" isButton size="large" fontFamily="Jost-Regular" text={text} />
    </Button>
  );
}