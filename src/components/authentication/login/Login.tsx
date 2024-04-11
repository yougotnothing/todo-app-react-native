import { useFormik } from "formik";
import Input from "../../../templates/components/Input";
import Text from "../../../templates/components/Text";
import { LogoWrapper, MainSection, TitleWrapper, Wrapper, Button, NotAMember, RegisterButton } from "./Login.styled";
import { LoginDto } from "../../../dto/login.dto";
import { loginSchema } from "../../../config/validation/yup.config";
import { handleLogin } from "../functions";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const navigation = useNavigation<any>();
  const formik = useFormik<LoginDto>({
    initialValues: {
      login: '',
      password: ''
    },
    validationSchema: loginSchema,
    onSubmit: () => {}
  });

  const login = async () => {
    if(!formik.values.login || !formik.values.password) {
      return;
    }

    handleLogin(formik.values)
      .then(() => {
        navigation.navigate('Root');
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
          value={formik.values.login}
        />
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