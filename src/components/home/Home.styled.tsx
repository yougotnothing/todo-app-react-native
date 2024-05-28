import styled from "styled-components/native";

interface TodoButtonProps {
  $type?: string;
  $counter?: number;
}

export const Container = styled.View`
  flex: 1;
  gap: 55px;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: #fff;
`;

export const Title = styled.Text`
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

export const Header = styled.View`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 20px;
`;

export const RightCircle = styled.View`
  position: absolute;
  height: 320px;
  width: 320px;
  border-radius: 50%;
  left: 27%;
`;

export const LeftCircle = styled.View`
  position: absolute;
  height: 250px;
  width: 250px;
  border-radius: 50%;
  left: -14px;
`;

export const Navbar = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 42px;
`;

export const ProfileButton = styled.TouchableOpacity`
  background-color: transparent;
  border-radius: 40px;
  width: 40px;
  height: 40px;
`;

export const DrawerButton = styled.TouchableOpacity`
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border: none;
`;

export const TextWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: center;
  flex-wrap: wrap;
  width: 70%;
  gap: 6px;
  margin: 0 auto;
`;

export const SearchIcon = styled.View`
  position: absolute;
  left: 16px;
  align-self: center;
  z-index: 999;
`;

export const Input = styled.TextInput`
  align-self: center;
  display: flex;
  background-color: white;
  border-radius: 14px;
  padding: 8px 16px 8px 48px;
  font-size: 17px;
  height: 48px;
  width: 80%;
  color: #888888;
  position: relative;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
`;

export const InputWrapper = styled.View`
  display: flex;
  flex-direction: row;
  position: relative;
  align-self: center;
`;

export const MainSection = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 64px;
  align-self: center;
  margin: 0 auto;
`;

export const TimeWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  gap: 8px;
`;

export const TimeButton = styled.TouchableOpacity`
  background-color: transparent;
  padding: 4px 26px;
  border-radius: 16px;
  border: 1px solid #646FD4;
`;

export const TodoButton = styled.TouchableOpacity<TodoButtonProps>`
  background-color: transparent;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  border-radius: 16px;
  width: 100px;
  height: 100px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.3);
  background-color:
    ${({ $type }) =>
      $type === 'school'
      ? "#2A8899" :
      $type === 'work'
      ? "#5EB0D2" :
      $type === 'shop'
      ? "#BE8972" :
      $type === 'read'
      ? "#646FD4" :
      $type === 'work out'
      ? "#83BC74" :
      "white"
    };
  justify-content: ${({ $type }) => !$type ? "center" : "space-between"};
  border: 1px solid ${({ $type }) => !$type ? "#D25EB0" : "transparent"};
  color: ${({ $type }) => !$type ? "#D25EB0" : "white"};
`;

export const TodoButtonsWrapper = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  flex: 1;
  margin: 0 auto;
  padding: 20px;
  position: relative;
  align-self: center;
  row-gap: 20px;
`;

export const TodoButtonCounter = styled.Text<TodoButtonProps>`
  font-size: 14px;
  color: white;
  position: absolute;
  top: 8px;
  right: 8px;
  display: ${({ $type }) => !$type ? "none" : "flex"};
  z-index: 999;
`;