import Wrapper from "@templates/Wrapper";
import { observer } from "mobx-react";
import { BackButton, ConfirmButton, InputWrapper, Navbar } from "./Change-password.styled";
import Input from "@templates/Input";
import { changePassword } from "@store/change-password";
import { SvgXml } from "react-native-svg";
import Icons from "@icons";
import { useNavigation } from "@react-navigation/native";
import { RouterProps } from "router/router.interface";
import Text from "@templates/Text";
import { user } from "@store/user";
import TransparentButton from "@templates/Transparent-button";

function ChangePassword() {
  const navigation = useNavigation<RouterProps>();

  const handleChangePassword = async () => {
    await user.changePassword(changePassword.toPasswordDto());
    navigation.navigate('Home');
    changePassword.clearFields();
  }

  return (
    <Wrapper>
      <Navbar>
        <BackButton onPress={() => navigation.goBack()}>
          <SvgXml xml={Icons["white back button"]} />
        </BackButton>
        <Text color="white" fontFamily="Jost-Medium" size="large" text="Change password" />
        <BackButton disabled></BackButton>
      </Navbar>
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
        <ConfirmButton onPress={handleChangePassword}>
          <Text color="white" fontFamily="Jost-Medium" size="large" text="Confirm" />
        </ConfirmButton>
        <TransparentButton text="forgot password?" onPress={() => navigation.navigate('Forgot password')} />
      </InputWrapper>
    </Wrapper>
  )
}

export default observer(ChangePassword);