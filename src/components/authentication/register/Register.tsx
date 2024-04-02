import { useFormik } from "formik";
import { registerSchema } from "../../../config/validation/yup.config";
import { Wrapper, InputsWrapper, Button, TitleWrapper, HeaderWrapper, Footer, AlreadyHaveAccount, AlreadyHaveAccountButton } from "./Register.styled";
import Input from "../../../templates/components/Input";
import Text from "../../../templates/components/Text";
import { RegisterDto } from "../../../dto/register.dto";
import { handleRegister } from "../functions";
import { useNavigation } from "@react-navigation/native";

export default function Register() {
  const navigation = useNavigation<any>();
  const formik = useFormik<RegisterDto>({
    initialValues: {
      name: '',
      password: '',
      email: '',
    },
    validationSchema: registerSchema,
    onSubmit: () => {}
  });

  return (
    <Wrapper>
      <TitleWrapper>
        <Text color="#9BA3EB" fontFamily="Jost-SemiBold" size="large" text="Mtodo Logo" />
      </TitleWrapper>
      <HeaderWrapper>
        <Text color="#9BA3EB" size="large" fontFamily="Jost-Medium" text="Hello!" />
        <Text color="#B9B8FA" size="medium" fontFamily="Jost-Medium" text="welcome to Mtodo app sign up to get started" />
      </HeaderWrapper>
      <InputsWrapper>
        <Input
          placeholder="Your name"
          value={formik.values.name}
          textContentType="name"
          onChange={formik.handleChange('name')}
          />
        <Input
          placeholder="Enter email"
          value={formik.values.email}
          textContentType="emailAddress"
          onChange={formik.handleChange('email')}
        />
        <Input
          placeholder="Password"
          textContentType="password"
          value={formik.values.password}
          onChange={formik.handleChange('password')}
        />
        <Footer>
          <Text color="#888888" size="small" fontFamily="Jost-Regular" text="by singing up you agree to our" />
          <Text color="#646FD4" size="small" fontFamily="Jost-Regular" text="terms & conditions" />
          <Text color="#888888" size="small" fontFamily="Jost-Regular" text="of use and" />
          <Text color="#646FD4" size="small" fontFamily="Jost-Regular" text="privacy policy" />
        </Footer>
      </InputsWrapper>
      <Button onPress={() => handleRegister(formik.values).then(() => navigation.navigate('Home'))}>
        <Text color="white" size="medium" weight="500" text="SIGN UP" />
      </Button>
      <AlreadyHaveAccount>
        <Text color="#8D93AB" size="small" fontFamily="Jost-Medium" text="Already have an account?" />
        <AlreadyHaveAccountButton onPress={() => navigation.navigate('Log in')}>
          <Text color="#646FD4" size="small" fontFamily="Jost-Medium" text="LOG IN" />
        </AlreadyHaveAccountButton>
      </AlreadyHaveAccount>
    </Wrapper>
  )
}