import { SvgXml } from "react-native-svg";
import { Button, ButtonsWrapper, SignUpButton, SignUpWrapper, TextWrapper, Wrapper } from "./Welcome-page.styled";
import Text from "@templates/Text";
import { useNavigation } from "@react-navigation/native";
import Icons from "@icons";
import { RouterProps } from "router/router.interface";

function SignUp() {
  const navigation = useNavigation<RouterProps>();

  return (
    <Wrapper>
      <SvgXml
        xml={Icons["sign up"]}
        width="470"
        height="359"
      />
      <TextWrapper>
        <Text color="black" fontFamily="Jost-Medium" size="medium" weight="700" text="Start Manage Your Task With" />
        <Text color="#9BA3EB" fontFamily="Jost-Medium" size="large" weight="700" text="Mtodo" />
      </TextWrapper>
      <ButtonsWrapper>
        <Button onPress={() => navigation.navigate('Register')}>
          <Text color="white" fontFamily="Jost-Medium" size="medium" weight="700" text="Sign Up" />
        </Button>
        <SignUpWrapper>
          <Text color="#8D93AB" fontFamily="Jost-Medium" size="small" weight="400" text="Already have an account?" />
          <SignUpButton onPress={() => navigation.navigate('Log in')}>
            <Text color="#646FD4" fontFamily="Jost-Medium" size="small" weight="700" text="LOG IN" />
          </SignUpButton>
        </SignUpWrapper>
      </ButtonsWrapper>
    </Wrapper>
  )
}

export default SignUp;