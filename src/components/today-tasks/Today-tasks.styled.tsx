import styled from "styled-components/native";

interface CircleProps {
  $left?: number | 'initial';
  $top?: number | 'initial';
  $right?: number | 'initial';
}

export const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;
  position: relative;
  height: 100%;
`;

export const Circle = styled.View<CircleProps>`
  position: absolute;
  left: ${({ $left }) => $left};
  top: ${({ $top }) => $top};
  right: ${({ $right }) => $right};
`;

export const Navbar = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 42px;
  position: relative;
  z-index: 4;
  margin-bottom: 14px;
`;

export const ReturnButton = styled.TouchableOpacity`
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
`;

export const Footer = styled.View`
  display: flex;
  margin-top: auto;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #363636;
  border-bottom-width: 0;
  border-right-width: 0;
  border-left-width: 0;
  gap: 20px;
  padding: 12px;
  width: 100%;
  height: 186px;
  position: relative;
`;

export const FooterMainInfo = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const ArrowDown = styled.TouchableOpacity`
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

export const AddTask = styled.TouchableOpacity`
  background-color: #646FD4;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`;

export const TasksWrapper = styled.ScrollView`
  display: flex;
  flex-direction: column;
  gap: 24px;
  column-gap: 24px;
  width: 100%;
  height: 100%;
  align-self: center;
  z-index: 3;
`;