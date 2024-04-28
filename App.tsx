import 'react-native-gesture-handler';
import Router from 'router';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import Text from '@templates/Text';

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
      }catch(error: unknown) {
        console.log('error', error);
        setIsFetching(false);
      }
    })();

    console.log('user_token', user_token);
  }, []);

  return (
    <NavigationContainer>
      {
        isFetching ? 
        <Text color="#363636" fontFamily="Jost-Medium" size="large" weight="700" text="Loading..." /> :
        <Router token={user_token} />
      }
    </NavigationContainer>
  );
}