import { TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";
import Text from "./Text";

interface ConfirmButtonProps extends TouchableOpacityProps {
	text: string;
	isFetching?: boolean;
}

const Button = styled.TouchableOpacity<{ $isFetching?: boolean }>`
	margin-top: 40px;
  background-color: ${({ $isFetching }) => $isFetching ? '#646FD4' : '#878cb9'};
  border-radius: 16px;
  padding: 10px 20px;
  width: 100%;
  display: flex;
`;

function ConfirmButton({ ...props }: ConfirmButtonProps) {
	return (
		<Button
			{...props}
			$isFetching={props.isFetching}
			disabled={props.isFetching}
			activeOpacity={0.8}
		>
			<Text color="white" fontFamily="Jost-Medium" size="large" text={props.text} />
		</Button>
	)
}

export default ConfirmButton;