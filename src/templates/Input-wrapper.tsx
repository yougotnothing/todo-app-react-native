import { ReactNode } from "react";
import styled from "styled-components/native";

const Wrapper = styled.View`
	display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  gap: 20px;
  padding: 20px;
  width: 100%;
  border-radius: 16px;
  background-color: #fff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
`;

function InputWrapper({ children }: { children: ReactNode }) {
	return (
		<Wrapper>{children}</Wrapper>
	)
}

export default InputWrapper;