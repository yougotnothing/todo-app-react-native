import styled from "styled-components/native";

export const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;
  height: 100%;
  background-color: #fff;
  gap: 40px;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  background-color: transparent;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: none;
`;

export const UserAvatar = styled.Image`
  border-radius: 150px;
`;

export const Navbar = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 42px;
`;

export const UserNameInput = styled.TextInput`
  font-size: 35px;
  font-weight: bold;
  color: #000;
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 0;
  font-family: 'Jost-Bold';
`;

export const UserInfo = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  border-radius: 16px;
  padding: 14px;
  background-color: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 300px;
`;

export const TextRow = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;