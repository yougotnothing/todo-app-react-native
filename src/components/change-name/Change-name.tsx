import { observer } from "mobx-react";
import Wrapper from "@templates/Wrapper";
import Navbar from "@templates/Navbar";
import BackButton from "@templates/Back-button";
import { useNavigation } from "@react-navigation/native";
import { RouterProps } from "router/router.interface";
import { TouchableOpacity } from "react-native";
import Text from "@templates/Text";
import Input from "@templates/Input";
import { changeName } from "@store/change-name";
import InputWrapper from "@templates/Input-wrapper";

function ChangeName() {
	const navigation = useNavigation<RouterProps>();

  return (
		<Wrapper>
			<Navbar
				header="Change name"
				buttons={[
					<BackButton color="white" onPress={() => navigation.goBack()} />,
					<TouchableOpacity disabled style={{ width: 40, height: 40 }} />
				]}
			/>
			<InputWrapper>
				<Text color="#363636" fontFamily="Jost-Medium" size="medium" text="Enter your new name" />
				<Input
					textContentType="name"
					placeholder="Enter your new name"
					value={changeName.newName}
					onChange={(value) => changeName.setNewName(value)}
				/>

			</InputWrapper>
		</Wrapper>
	);
}

export default observer(ChangeName);