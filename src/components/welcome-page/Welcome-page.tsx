import { Button, TextWrapper, Wrapper } from "./Welcome-page.styled";
import { SvgXml } from "react-native-svg";
import { welcome_image } from "./welcome-image";
import Text from "../../templates/components/Text";
import { colors } from "../../templates/colors";
import { useNavigation } from "@react-navigation/native";

export default function WelcomePage() {
  const navigation = useNavigation<any>();

  return (
    <Wrapper>
      <SvgXml
        xml={welcome_image}
        width="470"
        height="359"
      />
      <TextWrapper>
        <Text color={colors.fonts.black} fontFamily="Jost-Medium" size="large" weight="700" text="Manage your tasks" />
        <Text color="#8D93AB" fontFamily="Jost-Regular" size="small" weight="400" text="organize, plan, and collaborate on tasks with Mtodo. Your busy life deserves this. you can manage checklist and your goal." />
      </TextWrapper>
      <Button onPress={() => navigation.navigate('Sign Up')}>
        <Text color="white" fontFamily="Jost-Medium" size="medium" weight="700" text="Get started" />
      </Button>
    </Wrapper>
  )
}