import { SvgXml } from "react-native-svg";
import styled from "styled-components/native";
import Icons from "@icons";

interface CircleProps {
  $left?: number | 'initial';
  $top?: number | 'initial';
  $right?: number | 'initial';
}

const Container = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;
  height: 100%;
  background-color: #fff;
  gap: 52px;
  position: relative;
  z-index: 4;
`;

const Circle = styled.View<CircleProps>`
  position: absolute;
  left: ${({ $left }) => $left};
  top: ${({ $top }) => $top};
  right: ${({ $right }) => $right};
`;

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <Circle $left={0}>
        <SvgXml xml={Icons["right circle"]}
          width="250"
          height="250"
        />
      </Circle>
      <Circle $right={0} $top={0}>
        <SvgXml xml={Icons["bottom circle"]} />
      </Circle>
      {children}
    </Container>
  )
}

export default Wrapper;