import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../src/components/home/Home';
import Register from '../src/components/authentication/register/Register';
import Login from '../src/components/authentication/login/Login';

const Drawer = createDrawerNavigator();

export const DrawerStack = () => {
  return (
    <Drawer.Navigator initialRouteName='Home'>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Register" component={Register} />
      <Drawer.Screen name="Login" component={Login} />
    </Drawer.Navigator>
  )
}

export const DrawerItem = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  )
}