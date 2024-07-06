import { ReactNode } from "react";
import styled from "styled-components/native";
import Text from "./Text";
import { observer } from "mobx-react";

interface NavbarProps {
  header: string;
  buttons: Array<ReactNode>;
}

export const NavbarWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 42px;
`;

function Navbar({ header, buttons }: NavbarProps) {
  return (
    <NavbarWrapper>
      {buttons[0]}
      <Text color="white" fontFamily="Jost-Medium" size="large" text={header} />
      {buttons[1]}
    </NavbarWrapper>
  )
}

export default observer(Navbar);