import { useNavigation } from "@react-navigation/native";
import BackButton from "@templates/Back-button";
import Navbar from "@templates/Navbar";
import Wrapper from "@templates/Wrapper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RouterProps } from "router/router.interface";
import { ConfirmButton } from "./Change-email.styled";
import Input from "@templates/Input";
import { observer } from "mobx-react";
import { changeEmail } from "@store/change-email";
import Text from "@templates/Text";
import InputWrapper from "@templates/Input-wrapper";

function ChangeEmail() {
  const navigation = useNavigation<RouterProps>();

  return (
    <Wrapper>
      <Navbar
        header="Change email"
        buttons={[
          <BackButton color="white" onPress={() => navigation.goBack()} />,
          <TouchableOpacity disabled style={{ width: 40, height: 40 }} />,
        ]}
      />
      <InputWrapper>
        <Input
					isError={!changeEmail.isValid}
					placeholder="Enter your new email"
					textContentType="emailAddress"
					onChange={(value) => changeEmail.setNewEmail(value)}
					value={changeEmail.newEmail}
				/>
				<ConfirmButton>
					<Text color="white" fontFamily="Jost-Medium" size="large" text="Change email" />
				</ConfirmButton>
      </InputWrapper>
    </Wrapper>
  );
}

export default observer(ChangeEmail);
