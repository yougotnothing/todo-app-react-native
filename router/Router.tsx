import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "../src/components/authentication/register/Register";
import WelcomePage from "../src/components/welcome-page/Welcome-page";
import SignUp from "../src/components/welcome-page/Sign-up";
import Login from "../src/components/authentication/login/Login";
import { DrawerContentScrollView, createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../src/components/home/Home";
import Icons from "../src/config/enum/icons.enum";
import { SvgXml } from "react-native-svg";
import MiniProfile from "../src/components/mini-profile/Mini-profile";
import TodayTasks from "../src/components/today-tasks/Today-tasks";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerStack = () => {
  return (
    <Drawer.Navigator initialRouteName="Home" screenOptions={{
      keyboardDismissMode: 'on-drag',
      drawerItemStyle: {
        backgroundColor: 'transparent',
      },
      drawerStyle: {
        display: "flex",
        flexDirection: "column",
        gap: 30,
        paddingTop: 40
      },
      drawerType: 'front',
      drawerActiveTintColor: "#888888",
      headerStyle: {
        backgroundColor: "#646FD4",
      },
      headerShown: false,
      headerTintColor: "#9BA3EB",
      headerTitleStyle: {
        fontFamily: "Jost-Medium",
        fontWeight: "700",
        fontSize: 20,
        color: "white",
        display: 'flex',
        flexDirection: 'column-reverse'
      },
    }}
    drawerContent={() => <MiniProfile />}>
      <Drawer.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Drawer.Screen options={{ drawerIcon: () => <SvgXml xml={Icons["edit profile"]} /> }}
        name="Edit profile" component={Home}
      />
      <Drawer.Screen options={{
        drawerIcon: () => <SvgXml xml={Icons["daily tasks"]} />,
      }}
        name="Daily tasks" component={TodayTasks}
      />
      <Drawer.Screen options={{ drawerIcon: () => <SvgXml xml={Icons["important tasks"]} /> }}
        name="Important tasks" component={Home}
      />
      <Drawer.Screen options={{ drawerIcon: () => <SvgXml xml={Icons["done tasks"]} /> }}
        name="Done tasks" component={Home}
      />
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
      <Stack.Screen name="Register"  component={Register} />
      <Stack.Screen name="Welcome"  component={WelcomePage} />
      <Stack.Screen name="Sign Up"  component={SignUp} />
      <Stack.Screen name="Log in"  component={Login} />
      <Stack.Screen name="Daily tasks" options={{ headerShown: false }} component={TodayTasks} />
    </Stack.Navigator>
  )
}