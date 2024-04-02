import styled from "styled-components/native";

export const Wrapper = styled.View`
  background-color: #fff;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 45px;
`;

export const TitleWrapper = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
`;

export const Input = styled.TextInput`
  font-size: 20px;
  font-weight: bold;
`;

export const Button = styled.TouchableOpacity`
  background-color: #646FD4;
  border-radius: 14px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 56px;
`;

export const AlreadyHaveAccount = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 70%;
  gap: 4px;
`;

export const AlreadyHaveAccountButton = styled.TouchableOpacity`
  background-color: transparent;
  border: 1px solid #646FD4;
  color: #646FD4;
  border-top-width: 0;
  border-right-width: 0;
  border-left-width: 0;
  text-transform: uppercase;
`;

export const Text = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

export const InputsWrapper = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  gap: 8px;
`;

export const HeaderWrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 190px;
  align-items: center;
  gap: 8px;
`;

export const Eye = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border: none;
  background-color: transparent;
  position: absolute;
  right: 16px;
`;

export const PasswordInput = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  gap: 8px;
`;

export const Footer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  column-gap: 4px;
`;