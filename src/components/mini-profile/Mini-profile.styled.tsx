import styled from "styled-components/native";

interface UserImageProps {
  $isHaveAvatar: boolean | undefined;
}

export const Wrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 10px;
  border-top-width: 0;
  border-right-width: 0;
  border-left-width: 0;
`;

export const ReturnButton = styled.TouchableOpacity`
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
`;

export const UserImage = styled.Image<UserImageProps>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  display: ${({ $isHaveAvatar }) => $isHaveAvatar ? 'flex' : 'none'};
`;

export const DefaultAvatar = styled.View<UserImageProps>`
  display: ${({ $isHaveAvatar }) => $isHaveAvatar ? 'none' : 'flex'};
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
`;

export const UserWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

export const UserInfo = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

export const RoutesWrapper = styled.View`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;