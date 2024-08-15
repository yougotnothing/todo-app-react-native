import Wrapper from "@templates/Wrapper";
import { observer } from "mobx-react";
import { BackButton as InvisibleButton, InputWrapper } from "./Change-password.styled";
import Navbar from "@templates/Navbar";
import Input from "@templates/Input";
import { changePassword } from "@store/change-password";
import { useNavigation } from "@react-navigation/native";
import { RouterProps } from "router/router.interface";
import Text from "@templates/Text";
import { user } from "@store/user";
import TransparentButton from "@templates/Transparent-button";
import BackButton from "@templates/Back-button";
import ConfirmButton from "@templates/Confirm-button";

function ChangePassword() {
  const navigation = useNavigation<RouterProps>();

  const handleChangePassword = async () => {
    await user.changePassword(changePassword.toPasswordDto());
    navigation.navigate('Home');
    changePassword.clearFields();
  }

  return (
    <Wrapper>
      <Navbar
        header="Change password" 
        buttons={[
          <BackButton color="white" onPress={() => navigation.goBack()} />,
          <InvisibleButton disabled />
        ]}
      />
      <InputWrapper>
        <Input
          onChange={(value) => changePassword.setFieldValue('oldPassword', value)}
          value={changePassword.oldPassword}
          placeholder="Enter old password"
          textContentType="password"
        />
        <Input
          onChange={(value) => changePassword.setFieldValue('newPassword', value)}
          value={changePassword.newPassword}
          placeholder="Enter new password"
          textContentType="password"
        />
        <Input
          onChange={(value) => changePassword.setFieldValue('confirmNewPassword', value)}
          value={changePassword.confirmNewPassword}
          placeholder="Enter new password"
          textContentType="password"
        />
        <ConfirmButton text="Confirm" onPress={handleChangePassword} isFetching={changePassword.isFetching} />
        <TransparentButton text="forgot password?" onPress={() => navigation.navigate('Forgot password')} />
      </InputWrapper>
    </Wrapper>
  )
}

export default observer(ChangePassword);