import { Button, TextWrapper, Wrapper } from "./Welcome-page.styled";
import { SvgXml } from "react-native-svg";
import Text from "@templates/Text";
import { useNavigation } from "@react-navigation/native";
import Icons from "@icons";
import { RouterProps } from "router/router.interface";

function WelcomePage() {
  const navigation = useNavigation<RouterProps>();

  return (
    <Wrapper>
      <SvgXml
        xml={Icons["welcome"]}
        width="470"
        height="359"
      />
      <TextWrapper>
        <Text color="#363636" fontFamily="Jost-Medium" size="large" weight="700" text="Manage your tasks" />
        <Text color="#8D93AB" fontFamily="Jost-Regular" size="small" weight="400" text="organize, plan, and collaborate on tasks with Mtodo. Your busy life deserves this. you can manage checklist and your goal." />
      </TextWrapper>
      <Button onPress={() => navigation.navigate('Sign Up')}>
        <Text color="white" fontFamily="Jost-Medium" size="medium" weight="700" text="Get started" />
      </Button>
    </Wrapper>
  )
}

export default WelcomePage;