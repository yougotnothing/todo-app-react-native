import styled from "styled-components/native";

export const Wrapper = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: #fff;
  align-items: center;
  padding-top: 8%;
  gap: 52px;
`;

export const TextWrapper = styled.View`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const ButtonsWrapper = styled.View`
  display: flex;
  flex-direction: column;
  height: max-content;
  width: 100%;
  align-items: center;
  gap: 20px;
`;

export const Button = styled.TouchableOpacity`
  background-color: #9BA3EB;
  border-radius: 14px;
  padding: 8px 16px;
  color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 70%;
`;

export const SignUpWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

export const SignUpButton = styled.TouchableOpacity`
  color: #646FD4;
  border: 2px solid #646FD4;
  border-top-width: 0;
  border-right-width: 0;
  border-left-width: 0;
`;