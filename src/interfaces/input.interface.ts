import { TextInputIOSProps, TextInputProps } from "react-native";

export interface InputProps {
  placeholder: string;
  textContentType?: TextInputIOSProps['textContentType'];
  value: string;
  isError?: boolean;
  onChange: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}