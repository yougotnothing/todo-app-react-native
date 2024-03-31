import { useFormik } from "formik";
import { registerSchema } from "../../../config/validation/yup.config";
import { Wrapper, Input, Button } from "./Register.styled";
import Text from "../../../templates/components/Text";
import { RegisterDto } from "../../../types/register.type";
import { handleRegister } from "../functions";

export default function Register() {
  const formik = useFormik<RegisterDto>({
    initialValues: {
      name: '',
      password: '',
      email: '',
      confirmPassword: ''
    },
    validationSchema: registerSchema,
    onSubmit: () => {}
  });

  return (
    <Wrapper>
      <Text size="large" weight="700" text="Register" />
      <Input
        placeholder="Enter your name"
        value={formik.values.name}
        onChangeText={formik.handleChange('name')}
      />
      <Input
        placeholder="Enter your password"
        textContentType="password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      <Input
        placeholder="Enter your email"
        value={formik.values.email}
        onChangeText={formik.handleChange('email')}
      />
      <Input
        placeholder="Confirm your password"
        textContentType="password"
        value={formik.values.confirmPassword}
        onChangeText={formik.handleChange('confirmPassword')}
      />
      <Button onPress={() => handleRegister(formik.values)}>
        <Text size="medium" weight="500" text="Register" />
      </Button>
    </Wrapper>
  )
}