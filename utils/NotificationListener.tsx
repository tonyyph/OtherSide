import messaging from "@react-native-firebase/messaging";
import { useEffect } from "react";
import { Alert, PermissionsAndroid, Platform } from "react-native";

const NotificationListener = () => {
  // Request permission (iOS requires this)
  async function requestUserPermission() {
    await messaging().requestPermission();
  }

  async function requestNotificationPermission() {
    if (Platform.OS === "android" && Platform.Version >= 33) {
      try {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          {
            title: "Notification Permission",
            message: "This app would like to send you notifications",
            buttonPositive: "Allow",
            buttonNegative: "Deny"
          }
        );
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
