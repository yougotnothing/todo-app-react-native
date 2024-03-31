import { NavigationContainer, Route } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../src/components/home/Home";
import Register from "../src/components/authentication/register/Register";
import Text from "../src/templates/components/Text";
import WelcomePage from "../src/components/welcome-page/Welcome-page";
import SignUp from "../src/components/welcome-page/Sign-up";

const Stack = createNativeStackNavigator();

export default function Router() {
  return (
    <NavigationContainer theme={{
      dark: false,
      colors: {
        primary: 'rgba(0, 0, 0, 0)',
        background: 'rgb(0, 114, 122)',
        card: '#646FD4',
        text: '#fff',
        border: '#000',
        notification: 'rgba(0, 0, 0, 0)',
      }
    }}>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Welcome" component={WelcomePage} />
        <Stack.Screen name="Sign Up" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}