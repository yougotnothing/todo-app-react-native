import { TouchableOpacityProps } from "react-native";
import { SvgXml } from "react-native-svg";
import styled from "styled-components/native";
import Icons from "@icons";

const DrawerButton = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  height: 40px;
  width: 40px;
`;

function DrawerButtonWrapper({ ...props }: TouchableOpacityProps) {
  return (
    <DrawerButton {...props}>
      <SvgXml xml={Icons["menu"]} width={35} height={35} />
    </DrawerButton>
  )
}

export default DrawerButtonWrapper;