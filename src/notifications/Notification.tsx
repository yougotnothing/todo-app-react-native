import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Platform, View, Button, Text } from 'react-native';
import { useEffect, useRef, useState } from 'react';

interface NotificationDto {
  to: string | undefined;
  sound?: string;
  title: string;
  body: string;
  data?: {
    someData: string;
  }
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
});

const sendNotification = async (notification: NotificationDto) => {
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip, deflate'
    },
    body: JSON.stringify({ 
      ...notification 
    })
  });
}

async function useNotification() {
  if(Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      sound: 'default'
    });
  }

  if(Device.isDevice) {
    const [finalStatus, setFinalStatus] = useState<string | undefined>();
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    
    setFinalStatus(existingStatus);

    if(existingStatus !== 'granted') {
      await Notifications.requestPermissionsAsync()
            .then(({ status }) => setFinalStatus(status)); 
    }

    if(finalStatus !== 'granted') alert('Notifications are not granted');

    const projectId = Constants?.expoConfig?.extra?.eas?.projectId 
                      ?? Constants?.easConfig?.projectId;
    
    if(!projectId) alert('Project ID is not found');

    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId
        })
      ).data;

      console.log(pushTokenString);
      return pushTokenString;
    }catch(error: unknown) {
      alert(error);
    }
  }else alert('Notifications are supported only on Physical Devices');
}

export default function Notification() {
  const [expoPushToken, setExpoPushToken] = useState<string>();
  const [notification, setNotification] = useState<Notifications.Notification>();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const message: NotificationDto = {
    to: expoPushToken,
    sound: 'default',
    title: 'Test',
    body: 'Hello world!!!',
    data: {
      someData: 'good icecream'
    }
  }

  useEffect(() => {
    useNotification()
      .then((token) => setExpoPushToken(token))
      .catch((error: unknown) => alert(error));

    notificationListener.current = 
      Notifications.addNotificationReceivedListener(notification => setNotification(notification));
    
    responseListener.current = 
      Notifications.addNotificationResponseReceivedListener(res => console.log(res));
    
    return () => {
      notificationListener.current && 
        Notifications.removeNotificationSubscription(notificationListener.current);
      
      responseListener.current && 
        Notifications.removeNotificationSubscription(responseListener.current);
    }
  }, []);
  
  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}
    >
      <Text>Your Expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>
          Title: {notification && notification.request.content.title}{' '}
        </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>
          Data: {' '}
          {notification && JSON.stringify(notification.request.content.data)}
        </Text>
      </View>
      <Button
        title="Press to Send Notification"
        onPress={async () => await sendNotification({ ...message })}
      />
    </View>
  )
}
