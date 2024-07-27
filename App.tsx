import 'react-native-gesture-handler';
import Router from 'router';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import Text from 'src/templates/Text';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  const [user_token, setUser_token] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        setIsFetching(true);

        const token = await AsyncStorage.getItem('token');

        setUser_token(token);
        setIsFetching(false);
        console.log('user token: ', token);
      }catch(error: unknown) {
        console.log('error', error);
        setIsFetching(false);
      }
    })();
  }, []);

  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        {
          isFetching ? 
          <Text color="#363636" fontFamily="Jost-Medium" size="large" weight="700" text="Loading..." /> :
          <Router token={user_token} />
        }
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}