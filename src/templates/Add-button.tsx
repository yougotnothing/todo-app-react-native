import Icons from "@icons";
import { TouchableOpacityProps } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";
import styled from "styled-components/native";

const Button = styled.TouchableOpacity`
  background-color: #9BA3EB;
  height: 50px;
  width: 50px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
`;

function AddButton({ ...props }: TouchableOpacityProps) {
  return (
    <Button {...props}>
      <SvgXml
        xml={Icons["add icon"]}
      />
    </Button>
  )
}

export default AddButton;