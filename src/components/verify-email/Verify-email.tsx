import Wrapper from "@templates/Wrapper";
import Navbar from "@templates/Navbar";
import BackButton from "@templates/Back-button";
import { useNavigation } from "@react-navigation/native";
import { RouterProps } from "router/router.interface";
import { TouchableOpacity } from "react-native-gesture-handler";
import { VerifyWrapper, Button } from "./Verify-email.styled";
import Text from "@templates/Text";
import { observer } from "mobx-react";
import { user } from "@store/user";

function VerifyEmail() {
	const navigation = useNavigation<RouterProps>();

	return (
		<Wrapper>
			<Navbar
				header="Verify email"
				buttons={[
					<BackButton color="white" onPress={() => navigation.goBack()} />,
					<TouchableOpacity disabled style={{ width: 40, height: 40 }} />
				]}
			/>
			<VerifyWrapper>
				<Text color="#363636" fontFamily="Jost-Medium" size="large" text="Verify your email" />
				<Text color="#646FD4" fontFamily="Jost-Medium" size="medium" text={user.verificationMessage} />
				<Button onPress={() => user.sendEmailVerification()}>
					<Text color="#fff" fontFamily="Jost-Regular" size="large" text="Verify email" />
				</Button>
			</VerifyWrapper>
		</Wrapper>
	)
}

export default observer(VerifyEmail);