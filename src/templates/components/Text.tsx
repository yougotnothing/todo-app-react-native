import styled from "styled-components/native";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { TextProps } from "../../components/interfaces/text.interface";

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

export default function Text({ size, weight, text, fontFamily, color }: TextProps) {
  const [loaded, error] = useFonts({
    "Jost-Bold": require('../../../assets/fonts/Jost-Bold.ttf'),
    "Jost-Black": require('../../../assets/fonts/Jost-Black.ttf'),
    "Jost-ExtraBold": require('../../../assets/fonts/Jost-ExtraBold.ttf'),
    "Jost-ExtraLight": require('../../../assets/fonts/Jost-ExtraLight.ttf'),
    "Jost-Light": require('../../../assets/fonts/Jost-Light.ttf'),
    "Jost-Medium": require('../../../assets/fonts/Jost-Medium.ttf'),
    "Jost-Regular": require('../../../assets/fonts/Jost-Regular.ttf'),
    "Jost-SemiBold": require('../../../assets/fonts/Jost-SemiBold.ttf'),
    "Jost-Thin": require('../../../assets/fonts/Jost-Thin.ttf'),
  });

  useEffect(() => {
    if(error) {
      console.warn(error);
      return;
    }

    if(loaded) {
      console.log('Fonts loaded');
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