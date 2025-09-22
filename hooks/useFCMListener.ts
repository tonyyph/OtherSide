import messaging, {
  FirebaseMessagingTypes
} from "@react-native-firebase/messaging";
import { useEffect } from "react";
import { useAuction } from "./useAuction";

export function useFCMListener() {
  const { fetchAuctions } = useAuction();
  useEffect(() => {
    // Lắng nghe khi app đang mở (foreground)
    const unsubscribeOnMessage = messaging().onMessage(
      async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        if (remoteMessage?.data?.auctionID) {
          fetchAuctions(1, false);
        }
        console.log("📩 FCM message:", JSON.stringify(remoteMessage, null, 2));
      }
    );

    // Lắng nghe khi user bấm vào notification (app background)
    const unsubscribeOnOpen = messaging().onNotificationOpenedApp(
      (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        if (remoteMessage?.data?.auctionID) {
          fetchAuctions(1, false);
        }
        console.log(
          "📩 FCM opened app from background:",
          JSON.stringify(remoteMessage, null, 2)
        );
      }
    );

    // Lắng nghe khi app bị kill, mở từ notification
    messaging()
      .getInitialNotification()
      .then((remoteMessage: FirebaseMessagingTypes.RemoteMessage | null) => {
        if (remoteMessage) {
          if (remoteMessage?.data?.auctionID) {
            fetchAuctions(1, false);
          }
          console.log(
            "📩 FCM opened app from quit state:",
            JSON.stringify(remoteMessage, null, 2)
          );
        }
      });

    return () => {
      unsubscribeOnMessage();
      unsubscribeOnOpen();
    };
  }, []);
}
