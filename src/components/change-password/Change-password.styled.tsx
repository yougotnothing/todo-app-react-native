import styled from "styled-components/native";

export const InputWrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  gap: 20px;
  padding: 20px;
  width: 100%;
  border-radius: 16px;
  background-color: #fff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
`;

export const Navbar = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 42px;
  width: 100%;
`;

export const BackButton = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ConfirmButton = styled.TouchableOpacity`
  margin-top: 40px;
  background-color: #646FD4;
  border-radius: 16px;
  padding: 10px 20px;
  width: 100%;
  display: flex;
`;