import 'react-native-gesture-handler';
import Router from './router/Router';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerStack } from './router/Drawer';

export default function App() {
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
}
