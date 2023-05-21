/* eslint-disable prettier/prettier */

import React, {useEffect} from 'react';
import PushNotification from 'react-native-push-notification';

const PushController = () => {
  useEffect(() => {
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);

        if (notification.userInteraction) {
          console.log('User tapped on the notification');
        } else {
          console.log(
            'Notification received while the app is in the foreground',
          );
        }
      },

      // Android only
      senderID: '946507323949',

      // iOS only
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,
      requestPermissions: true,
    });
  }, []);

  return null;
};

export default PushController;
