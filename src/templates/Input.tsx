import { TextInputIOSProps } from "react-native";
import styled from "styled-components/native";
import { SvgXml } from "react-native-svg";
import { useState } from "react";
import Icons from "../config/enum/icons.enum";

interface TextInputProps {
  $isError?: boolean;
}

const TextInput = styled.TextInput<TextInputProps>`
  background-color: transparent;
  border-radius: 12px;
  padding: 16px 22px;
  font-size: 16px;
  width: 100%;
  color: #888888;
  border: 1.5px solid ${({ $isError }) => $isError ? '#BF1A1A' : '#D9D9D9'};
`;

const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  position: relative;
  align-items: center;
  padding: 0;
  margin: 0;
  width: 100%;
`;

const Eye = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  top: 20px;
  width: 35px;
  border: none;
  align-self: center;
  height: 35px;
`;

interface InputProps {
  placeholder: string;
  textContentType?: TextInputIOSProps['textContentType'];
  value: string;
  onChange: (text: string) => void;
  isError?: boolean;
}

export default function Input({ placeholder, textContentType, value, onChange, isError }: InputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(true);

  const handleSetShowPassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    <Wrapper>
      <TextInput
        placeholderTextColor="#D9D9D9"
        placeholder={placeholder}
        textContentType={textContentType}
        value={value}
        onChangeText={onChange}
        $isError={isError}
        secureTextEntry={!showPassword && textContentType === 'password'}
      />
      {textContentType === 'password' && (
        <Eye onPress={handleSetShowPassword}>
          <SvgXml xml={Icons["eye"]} />
        </Eye>
      )}
    </Wrapper>
  );
}