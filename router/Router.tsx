import { SvgXml } from "react-native-svg";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icons from "@icons";
import Home from "components/home/Home";
import SignUp from "components/welcome-page/Sign-up";
import Login from "components/authentication/login/Login";
import TodayTasks from "components/tasks/Tasks";
import CreateTask from "components/create-task/Create-task";
import MiniProfile from "components/mini-profile/Mini-profile";
import WelcomePage from "components/welcome-page/Welcome-page";
import Register from "components/authentication/register/Register";
import Notification from "notifications/Notification";
import Profile from "components/profile/Profile";
import { user } from "@store/user";
import ChangePassword from "components/change-password/Change-password";
import { useEffect } from "react";
import ForgotPassword from "components/forgot-password/Forgot-password";
import VerifyEmail from "components/verify-email/Verify-email";

interface Token {
  token: string | null;
}

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const { Screen, Navigator } = Stack;

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
        name="Edit profile" component={Profile}
      />
      <Drawer.Screen options={{
        gestureHandlerProps: { enabled: true },
        drawerIcon: () => <SvgXml xml={Icons["daily tasks"]} />,
      }}
        name="Daily tasks" component={TodayTasks}
      />
      <Drawer.Screen options={{ drawerIcon: () => <SvgXml xml={Icons["important tasks"]} /> }}
        name="Important tasks" component={TodayTasks}
      />
      <Drawer.Screen options={{ drawerIcon: () => <SvgXml xml={Icons["done tasks"]} /> }}
        name="Done tasks" component={TodayTasks}
      />
    </Drawer.Navigator>
  );
}

export default function Router({ token }: Token) {
  const noHeader = { headerShown: false };
  const noHeaderTitle = (title: string) => ({ ...noHeader, headerTitle: title });

  useEffect(() => {
    console.log('is logged in ', user.isLoggedIn);
  }, [user.isLoggedIn]);

  return (
    <Navigator screenOptions={{
      headerStyle: {
        backgroundColor: "#646FD4",
      },
      headerTintColor: "#9BA3EB",
      headerTitleStyle: {
        fontFamily: "Jost-Medium",
        fontWeight: "700",
        fontSize: 20,
        color: "white",
      }}}
      initialRouteName={token ? 'Root' : 'Welcome'}
    >
      <Screen
        name="Root"
        component={DrawerStack}
        options={{ ...noHeader, gestureEnabled: false }}
      />
      <Screen
        name="Notification"
        component={Notification}
      />
      <Screen
        name="Register"
        component={Register}
      />
      <Screen
        name="Welcome"
        component={WelcomePage}
      />
      <Screen
        name="Sign Up"
        component={SignUp}
      />
      <Screen
        name="Log in"
        component={Login}
        options={{
          gestureEnabled: false,
          headerBackVisible: user.isLoggedIn
        }}
      />
      <Screen
        name="Create task"
        options={noHeader}
        component={CreateTask}
      />
      <Screen
        name="Daily tasks"
        options={noHeader}
        component={TodayTasks}
      />
      <Screen
        name="Today tasks"
        options={noHeader}
        component={TodayTasks}
      />
      <Screen
        name="Week tasks"
        options={noHeaderTitle("Week tasks")}
        component={TodayTasks}
      /> 
      <Screen
        name="Month tasks"
        options={noHeaderTitle("Month tasks")}
        component={TodayTasks}
      />
      <Screen
        name="School tasks"
        options={noHeaderTitle("School tasks")}
        component={TodayTasks}
      />
      <Screen
        name="Work tasks"
        options={noHeaderTitle("Work tasks")}
        component={TodayTasks}
      />
      <Screen
        name="Shop tasks"
        options={noHeaderTitle("Shop tasks")}
        component={TodayTasks}
      />
      <Screen
        name="Read tasks"
        options={noHeaderTitle("Read tasks")}
        component={TodayTasks}
      />
      <Screen
        name="Work out tasks"
        options={noHeaderTitle("Work out tasks")}
        component={TodayTasks}
      />
      <Screen
        name="Profile"
        options={noHeaderTitle("Profile")}
        component={Profile}
      />
      <Screen
        name="Change password"
        options={noHeaderTitle("Change password")}
        component={ChangePassword}
      />
      <Screen
        name="Important tasks"
        options={noHeaderTitle("Important tasks")}
        component={TodayTasks}
      />
      <Screen
        name="Done tasks"
        options={noHeaderTitle("Done tasks")}
        component={TodayTasks}
      />
      <Screen
        name="Forgot password"
        options={noHeaderTitle("Forgot password")}
        component={ForgotPassword}
      />
      <Screen
        name="Verify email"
        options={noHeaderTitle("Verify email")}
        component={VerifyEmail}
      />
    </Navigator>
  )
}