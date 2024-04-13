import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "../src/components/authentication/register/Register";
import WelcomePage from "../src/components/welcome-page/Welcome-page";
import SignUp from "../src/components/welcome-page/Sign-up";
import Login from "../src/components/authentication/login/Login";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../src/components/home/Home";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerStack = () => {
  return (
    <Drawer.Navigator initialRouteName="Home" screenOptions={{
      headerStyle: {
        backgroundColor: "#646FD4",
      },
      headerTintColor: "#9BA3EB",
      headerTitleStyle: {
        fontFamily: "Jost-Medium",
        fontWeight: "700",
        fontSize: 20,
        color: "white",
      }
    }}>
      <Drawer.Screen name="Home" component={Home} options={{ headerShown: false }} />
    </Drawer.Navigator>
  )
}

export default function Router() {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: "#646FD4",
      },
      headerTintColor: "#9BA3EB",
      headerTitleStyle: {
        fontFamily: "Jost-Medium",
        fontWeight: "700",
        fontSize: 20,
        color: "white",
      }}} initialRouteName="Root"
    >
      <Stack.Screen
        name="Root"
        component={DrawerStack}
        options={{
          headerShown: false,
          gestureEnabled: false
        }}
      />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Welcome" component={WelcomePage} />
      <Stack.Screen name="Sign Up" component={SignUp} />
      <Stack.Screen name="Log in" component={Login} />
    </Stack.Navigator>
  )
}