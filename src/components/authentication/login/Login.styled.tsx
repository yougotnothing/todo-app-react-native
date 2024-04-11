import styled from "styled-components/native";

export const Wrapper = styled.View`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  gap: 68px;
  padding: 20px;
  background-color: #fff;
`;

export const LogoWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const MainSection = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 24px;
`;

export const TitleWrapper = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  margin-bottom: 24px;  
`;

export const Button = styled.TouchableOpacity`
  margin-top: 36px;
  background-color: #646FD4;
  border-radius: 14px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 56px;
`;

export const NotAMember = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

export const RegisterButton = styled.TouchableOpacity`
  background-color: transparent;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;