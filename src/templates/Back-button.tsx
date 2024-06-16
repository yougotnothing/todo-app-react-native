import { TouchableOpacityProps } from "react-native";
import { SvgXml } from "react-native-svg";
import Icons from "@icons";
import styled from "styled-components/native";

interface Props extends TouchableOpacityProps {
  color: "white" | "blue";
}

const Button = styled.TouchableOpacity`
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  margin: 0;
`;

function BackButton({ color, ...props }: Props) {
  return (
    <Button {...props}>
      <SvgXml
        xml={Icons[`${color} back button`]}
      />
    </Button>
  )
}

export default BackButton;