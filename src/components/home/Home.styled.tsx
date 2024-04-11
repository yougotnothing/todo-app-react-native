import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  gap: 20px;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 20px;
  background-color: #fff;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

export const Input = styled.TextInput`
  font-size: 20px;
  font-weight: bold;
`;

export const Button = styled.TouchableOpacity`
  background-color: #007aff;
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const Text = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

export const Task = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const TasksWrapper = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  height: 500px;
  background-color: #fff;
`;

export const SearchInput = styled.TextInput`
  background-color: white;
  border-radius: 14px;
  padding: 8px 16px 8px 24px;
  font-size: 17px;
  width: 75%;
  color: #D9D9D9;
  position: relative;
`;
