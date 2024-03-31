import { TextInputIOSProps } from "react-native";
import styled from "styled-components/native";

const TextInput = styled.TextInput`
  background-color: transparent;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  color: #D9D9D9;
  border: 1px solid #D9D9D9;
`;
const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  position: relative;
  align-items: center;
  width: 100%;
`;

export const Eye = styled.TouchableOpacity`
  position: absolute;
  right: 16px;
  background-image: url('/assets/eye.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 20px;
  height: 20px;
`;

interface InputProps {
  placeholder: string;
  textContentType?: TextInputIOSProps['textContentType'];
  value: string;
  onChange: (text: string) => void;
}

export default function Input({ placeholder, textContentType, value, onChange }: InputProps) { 
  return (
    <Wrapper>
      <TextInput
        placeholder={placeholder}
        textContentType={textContentType}
        value={value}
        onChangeText={onChange}
      />
      {textContentType === 'password' && <Eye />}
    </Wrapper>
  );
}