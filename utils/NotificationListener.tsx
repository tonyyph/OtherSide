import messaging from "@react-native-firebase/messaging";
import { useCallback, useEffect } from "react";
import { Alert, Linking, PermissionsAndroid, Platform } from "react-native";

const NotificationListener = () => {
  // Request permission (iOS requires this)
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Notification permission granted.");
    } else {
      console.log("Notification permission denied.");
    }
  }

  async function requestNotificationPermission() {
    if (Platform.OS === "android" && Platform.Version >= 33) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          {
            title: "Notification Permission",
            message: "This app would like to send you notifications",
            buttonPositive: "Allow",
            buttonNegative: "Deny"
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Notification permission granted");
        } else {
          console.log("Notification permission denied");
        }
      } catch (err) {
        console.warn("Permission error:", err);
      }
    }
  }

  useEffect(() => {
    requestNotificationPermission();
    requestUserPermission();

    // Foreground messages
    const unsubscribeOnMessage = messaging().onMessage(
      async (remoteMessage) => {
        Alert.alert("Notification");

        // Handle navigation for foreground notifications if needed
        // You might want to show a custom in-app notification instead
      }
    );

    // When app is in background and opened by tapping notification
    const unsubscribeOnNotificationOpened = messaging().onNotificationOpenedApp(
      (remoteMessage) => {
        // Navigate based on notification data
      }
    );

    // When app is opened from a quit/killed state
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
        }
      });

    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpened();
    };
  }, []);

  return <></>;
};

export default NotificationListener;
