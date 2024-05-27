import styled from "styled-components/native";

interface UserAvatarProps {
  $isHaveAvatar: boolean;
  $avatar: string;
}

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