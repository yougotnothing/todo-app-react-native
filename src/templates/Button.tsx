import styled from "styled-components/native";
import Text from "./Text";
import { Props } from "src/interfaces/button.interface";

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

function SignUpButton({ text, ...props }: Props) {
  return(
    <Button {...props}>
      <Text color="#D9D9D9" fontFamily="Jost-Regular" text={text} />
    </Button>
  );
}

export default SignUpButton;