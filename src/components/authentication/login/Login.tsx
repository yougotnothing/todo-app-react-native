import { useFormik } from "formik";
import Input from "@templates/Input";
import Text from "@templates/Text"; 
import {
  LogoWrapper,
  MainSection,
  TitleWrapper,
  Wrapper,
  Button,
  NotAMember,
  RegisterButton
} from "./Login.styled";
import { LoginDto } from "dto/login";
import { useNavigation } from "@react-navigation/native";
import { loginSchema } from "@config/validation";
import { user } from "@store/user";
import { RouterProps } from "router/router.interface";
import { useEffect } from "react";

export default function Login() {
  const navigation = useNavigation<RouterProps>();
  const formik = useFormik<LoginDto>({
    initialValues: {
      login: '',
      password: ''
    },
    validationSchema: loginSchema,
    onSubmit: (_, helpers) => {
      helpers.setFieldValue("login", "");
      helpers.setFieldValue("password", "");
    }
  });

  useEffect(() => {
    if(!user.isLoggedIn) navigation.setOptions({ canGoBack: false });
  }, [user.isLoggedIn]);

  const login = async () => {
    if(!formik.values.login || !formik.values.password) return;

    await user.login(formik.values)
              .then(({ isLoggedSuccess }) => {
                isLoggedSuccess && navigation.navigate('Root')
                if(!user.isVerified) user.sendEmailVerification();
              });
  }

  return (
    <Wrapper>
      <LogoWrapper>
        <Text color="#9BA3EB" fontFamily="Jost-SemiBold" size="large" weight="800" text="Mtodo Logo" />
      </LogoWrapper>
      <MainSection>
        <TitleWrapper>
          <Text color="#9BA3EB" fontFamily="Jost-Medium" size="large" text="Hello Again!" />
          <Text color="#B9B8FA" fontFamily="Jost-Medium" size="medium" text="Welcome Back" />
        </TitleWrapper>
        <Input
          placeholder="Enter your login"
          textContentType="emailAddress"
          onChange={formik.handleChange('login')}
          value={formik.values.login} />
        <Input
          placeholder="Enter your password"
          textContentType="password"
          onChange={formik.handleChange('password')}
          value={formik.values.password}
        />
        <Button onPress={login}>
          <Text color="white" size="medium" weight="500" text="LOG IN" />
        </Button>
      </MainSection>
      <NotAMember>
        <Text color="#8D93AB" size="medium" text="Not a member?" />
        <RegisterButton onPress={() => navigation.navigate('Register')}>
          <Text color="#646FD4" size="medium" text="Register now" />
        </RegisterButton>
      </NotAMember>
    </Wrapper>
  )
}