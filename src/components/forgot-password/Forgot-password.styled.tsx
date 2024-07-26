import styled from "styled-components/native";

export const ContentWrapper = styled.View`
	margin-top: 60px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
	border-radius: 16px;
	padding: 20px;
	background-color: #fff;
	box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
	width: 100%;
	height: 380px;
	justify-content: space-between;
`;

export const Button = styled.TouchableOpacity`
	background-color: #646FD4;
	border-radius: 14px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 56px;
`;