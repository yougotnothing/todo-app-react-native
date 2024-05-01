import { useFormik } from "formik";
import { registerSchema } from "@config/validation";
import { Wrapper, InputsWrapper, Button, TitleWrapper, HeaderWrapper, Footer, AlreadyHaveAccount, AlreadyHaveAccountButton } from "./Register.styled";
import Input from "@templates/Input";
import Text from "@templates/Text";
import { RegisterDto } from "../../../dto/register.dto";
import { useNavigation } from "@react-navigation/native";
import { api } from "axios-config";

export default function Register() {
  const navigation = useNavigation<any>();
  const formik = useFormik<RegisterDto>({
    initialValues: {
      name: '',
      password: '',
      email: ''
    },
    validationSchema: registerSchema,
    onSubmit: () => {}
  });

  const register = async () => {
    try {
      await api.post('/auth/register', {
        ...formik.values,
      })
      .then(req => {
        if(req.status !== 200) { 
          return;
        }else navigation.navigate('Home');
        
        console.log('request', req.data);
      });
    }catch(error: any) {
      console.error(error);
    }
  }

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
          isError={!!formik.errors.name}
          placeholder="Your name"
          value={formik.values.name}
          textContentType="name"
          onChange={formik.handleChange('name')}
        />
        <Input
          isError={!!formik.errors.email}
          placeholder="Enter email"
          value={formik.values.email}
          textContentType="emailAddress"
          onChange={formik.handleChange('email')}
        />
        <Input
          isError={!!formik.errors.password}
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
      <Button onPress={register}>
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
