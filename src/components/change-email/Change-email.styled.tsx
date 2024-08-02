import styled from "styled-components/native";

export const InputWrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  gap: 20px;
  padding: 20px;
  width: 100%;
	height: 380px;
  border-radius: 16px;
  background-color: #fff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
`;

export const ConfirmButton = styled.TouchableOpacity`
	background-color: #646FD4;
	border-radius: 14px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 56px;
`;