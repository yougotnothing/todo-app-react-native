import { TextInputIOSProps } from "react-native";
import styled from "styled-components/native";
import { SvgXml } from "react-native-svg";
import { eye } from "./eye.image";
import { useEffect, useState } from "react";

const TextInput = styled.TextInput`
  background-color: transparent;
  border-radius: 12px;
  padding: 16px 22px;
  font-size: 16px;
  width: 100%;
  color: #D9D9D9;
  border: 1.5px solid #D9D9D9;
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
}

export default function Input({ placeholder, textContentType, value, onChange }: InputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(true);

  const handleSetShowPassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    <Wrapper>
      <TextInput
        placeholder={placeholder}
        textContentType={textContentType}
        value={value}
        onChangeText={onChange}
        secureTextEntry={!showPassword && textContentType === 'password'}
      />
      {textContentType === 'password' && (
        <Eye onPress={handleSetShowPassword}>
          <SvgXml xml={eye} />
        </Eye>
      )}
    </Wrapper>
  );
}