import { useNavigation } from "@react-navigation/native";
import BackButton from "@templates/Back-button";
import Navbar from "@templates/Navbar";
import Wrapper from "@templates/Wrapper";
import { RouterProps } from "router/router.interface";
import { Button, ContentWrapper } from "./Forgot-password.styled";
import Text from "@templates/Text";
import { observer } from "mobx-react";
import { TouchableOpacity } from "react-native";
import { forgotPassword } from "@store/forgot-password";
import { user } from "@store/user";
import { useEffect } from "react";

function ForgotPassword() {
	const navigation = useNavigation<RouterProps>();

	useEffect(() => {
		console.log('user id', user.id);
	}, []);

 	return (
		<Wrapper>
			<Navbar
				header="Forgot password"
				buttons={[
					<BackButton color="white" onPress={() => navigation.goBack()} />,
					<TouchableOpacity disabled style={{ width: 40, height: 40 }} />
				]}
			/>
			<ContentWrapper>
				<Text
					color="#363636"
					fontFamily="Jost-Medium"
					size="medium"
					weight="700"
					text="Press the button below to reset your password."
				/>
				<Text
					color="#646FD4"
					fontFamily="Jost-Medium"
					size="medium"
					weight="700"
					text={forgotPassword.message}
				/>
				<Button
					activeOpacity={0.7}
					onPress={() => forgotPassword.sendEmailVerification()}
					disabled={forgotPassword.isFetching}
				>
					<Text
						color="#fff"
						fontFamily="Jost-Regular"
						size="medium"
						weight="400"
						text="Get reset link"
					/>
				</Button>
			</ContentWrapper>
		</Wrapper>
	)
}

export default observer(ForgotPassword);