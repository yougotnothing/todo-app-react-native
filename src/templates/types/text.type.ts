export interface Props {
  size: 'small' | 'medium' | 'large';
  weight?: '700' | '500' | '400' |'300';
  fontFamily?: 
    | "Jost-Bold"
    | "Jost-Black"
    | "Jost-ExtraBold"
    | "Jost-ExtraLight"
    | "Jost-Light"
    | "Jost-Medium"
    | "Jost-Regular"
    | "Jost-SemiBold"
    | "Jost-Thin";
}

export interface TextProps extends Props {
  text?: string;
  isButton?: boolean;
  header?: boolean;
  color: string;
}