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
import ConfirmButton from "@templates/Confirm-button";
import { user } from "@store/user";
import { useEffect } from "react";
import MessageModal from "@animated/Message-modal";
import { messageModal } from "@store/message-modal";

function ChangeName() {
	const navigation = useNavigation<RouterProps>();

	const handleSetNewName = () => {
		user.changeName(changeName.newName);

		navigation.navigate('Profile');

		messageModal.setIsOpen(true);
		messageModal.setMessage("Name changed successfully!");
	}

	useEffect(() => {
		changeName.setNewName(user.name);
	}, [user.name]);

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
					isError={changeName.newName === user.name || !changeName.newName.length}
					textContentType="name"
					placeholder="Enter your new name"
					value={changeName.newName}
					onChange={(value) => changeName.setNewName(value)}
				/>
				<ConfirmButton
					text="Confirm"
					disabled
					onPress={handleSetNewName}
				/>
			</InputWrapper>
		</Wrapper>
	);
}

export default observer(ChangeName);