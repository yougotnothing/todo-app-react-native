import { SvgXml } from "react-native-svg";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icons from "@icons";
import Home from "components/home/Home";
import SignUp from "components/welcome-page/Sign-up";
import Login from "components/authentication/login/Login";
import TodayTasks from "components/today-tasks/Today-tasks";
import CreateTask from "components/create-task/Create-task";
import MiniProfile from "components/mini-profile/Mini-profile";
import WelcomePage from "components/welcome-page/Welcome-page";
import Register from "components/authentication/register/Register";
import Notification from "notifications/Notification";

interface Token {
  token: string | null;
}

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
        gestureHandlerProps: { enabled: true },
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

export default function Router({ token }: Token) {
  const noHeader = { headerShown: false };
  const noHeaderTitle = (title: string) => ({ ...noHeader, headerTitle: title });

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
      }}} initialRouteName={token ? 'Root' : 'Welcome'}
    >
      <Stack.Screen name="Root" component={DrawerStack} options={{ ...noHeader, gestureEnabled: false }} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Welcome" component={WelcomePage} />
      <Stack.Screen name="Sign Up" component={SignUp} />
      <Stack.Screen name="Log in" component={Login} />
      <Stack.Screen name="Create task" options={noHeader} component={CreateTask} />
      <Stack.Screen name="Daily tasks" options={noHeader} component={TodayTasks} />
      <Stack.Screen name="Today tasks" options={noHeader} component={TodayTasks} />
      <Stack.Screen name="Week tasks" options={noHeaderTitle("Week tasks")} component={TodayTasks} /> 
      <Stack.Screen name="Month tasks" options={noHeaderTitle("Month tasks")} component={TodayTasks} />
    </Stack.Navigator>
  )
}