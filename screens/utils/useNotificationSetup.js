import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';

export default function useNotificationSetup() {
  useEffect(() => {
    console.log('Setting up notifications...');
    registerForPushNotificationsAsync().then(token => {
      console.log('FIREBASE NOTIFICATION TOKEN:', token);
    }).catch(error => {
      console.error('Error getting notification token:', error);
    });

    const subscription1 = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification Received:', notification);
      // Here you can handle the notification (show an alert, navigate, etc.)
    });

    const subscription2 = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification Response Received:', response);
      // Handle the response (user tapped on the notification)
    });

    // Clean up function to remove the listeners
    return () => {
      subscription1.remove();
      subscription2.remove();
    };
  }, []);
}

async function registerForPushNotificationsAsync() {
  let token;
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  const firebaseProjectId = 'moodreal-1c337';  // Make sure this is your actual Firebase project ID

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.error('Failed to get push token for push notification!');
    return;
  }

  console.log('Permissions granted:', finalStatus);
  
  try {
    token = (await Notifications.getExpoPushTokenAsync({
      development: true, // Set to false for production builds
      projectId: firebaseProjectId,
    })).data;
    console.log('FIREBASE NOTIFICATION TOKEN:', token);
  } catch (error) {
    console.error('Failed to get the push token', error);
    throw error; // Rethrowing the error may be handled by an error boundary or similar error handling approach
  }

  // Optionally, send the token to your backend server for storage
  // sendTokenToServer(token);

  return token;
}

// Example function to send the token to a server
async function sendTokenToServer(token) {
  try {
    const response = await fetch('YOUR_BACKEND_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    const data = await response.json();
    console.log('Token sent to server:', data);
  } catch (error) {
    console.error('Failed to send token to server:', error);
  }
}
