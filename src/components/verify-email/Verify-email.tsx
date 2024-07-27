import Wrapper from "@templates/Wrapper";
import Navbar from "@templates/Navbar";
import BackButton from "@templates/Back-button";
import { useNavigation } from "@react-navigation/native";
import { RouterProps } from "router/router.interface";
import { TouchableOpacity } from "react-native-gesture-handler";
import { VerifyWrapper } from "./Verify-email.styled";
import Text from "@templates/Text";
import { observer } from "mobx-react";

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
				<Text color="#363636" fontFamily="Jost-Medium" size="medium" weight="700" text="Verify your email" />
				<Text color="#646FD4" fontFamily="Jost-Medium" size="medium" weight="700" text="We sent you a verification email" />
			</VerifyWrapper>
		</Wrapper>
	)
}

export default observer(VerifyEmail);