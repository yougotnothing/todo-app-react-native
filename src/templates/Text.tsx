import styled from "styled-components/native";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { TextProps } from "src/interfaces/text.interface";

export const T = styled.Text<TextProps>`
  text-align: center;
  margin: 0;
  padding: 0;
  font-size: ${({ size }) =>
    size === 'small'
    ? '14px'
    : size === 'medium'
    ? '18px'
    : '26px'};
  color: ${({ color }) => color};
  font-weight: ${({ weight }) => weight ? weight : '500'};
`;

function Text({ size, weight, text, fontFamily, color }: TextProps) {
  const [loaded, error] = useFonts({
    "Jost-Bold": require('fonts/Jost-Bold.ttf'),
    "Jost-Black": require('fonts/Jost-Black.ttf'),
    "Jost-ExtraBold": require('fonts/Jost-ExtraBold.ttf'),
    "Jost-ExtraLight": require('fonts/Jost-ExtraLight.ttf'),
    "Jost-Light": require('fonts/Jost-Light.ttf'),
    "Jost-Medium": require('fonts/Jost-Medium.ttf'),
    "Jost-Regular": require('fonts/Jost-Regular.ttf'),
    "Jost-SemiBold": require('fonts/Jost-SemiBold.ttf'),
    "Jost-Thin": require('fonts/Jost-Thin.ttf'),
  });

  useEffect(() => {
    if(error) {
      console.warn(error);
      return;
    }
  }, [loaded, error]);

  return (
    <>
      {loaded && (
        <T
          color={color}
          style={{ fontFamily: fontFamily ? fontFamily : 'Jost-Regular' }}
          size={size}
          weight={weight}
        >{text}</T>
      )}
    </>
  );
}

export default Text;