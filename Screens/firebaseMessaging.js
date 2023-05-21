/* eslint-disable no-alert */
/* eslint-disable prettier/prettier */

import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';

export const requestUserPermission = async () => {
  try {
    const authStatus = await messaging().requestPermission();

    if (authStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      console.log('Notification permission granted');

      // Retrieve the FCM token
      const fcmToken = await messaging().getToken();
      console.log('FCM Token:', fcmToken);
    } else if (authStatus === messaging.AuthorizationStatus.PROVISIONAL) {
      console.log('Notification permission granted provisionally');
    } else {
      console.log('Notification permission denied');
    }
  } catch (error) {
    console.error('Error requesting permission:', error);
    Alert.alert('Error', 'Failed to request notification permission.');
  }
};










