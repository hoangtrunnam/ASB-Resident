import { Platform, AppState } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
// import firebase from "react-native-firebase";
// import type { RemoteMessage } from "react-native-firebase";
// https://rnfirebase.io/messaging/notifications
import * as NavigationService from "../navigation/navigateService";
import { StackActions, NavigationActions } from "react-navigation";

AsyncStorage.getItem("lastNotification").then((data) => {
  if (data) {
    // if notification arrives when app is killed, it should still be logged here
    // console.log("last notification", JSON.parse(data));
    AsyncStorage.removeItem("lastNotification");
  }
});

AsyncStorage.getItem("lastMessage").then((data) => {
  if (data) {
    // if notification arrives when app is killed, it should still be logged here
    // console.log("last message", JSON.parse(data));
    AsyncStorage.removeItem("lastMessage");
  }
});

export function registerKilledListener() {
  // these callback will be triggered even when app is killed
  /* FCM.on(FCMEvent.Notification, (notif) => {
    AsyncStorage.setItem("lastNotification", JSON.stringify(notif));
    if (notif.opened_from_tray) {
      setTimeout(() => {
        if (notif._actionIdentifier === "reply") {
          if (AppState.currentState !== "background") {
            console.log("User replied " + JSON.stringify(notif._userText));
            alert("User replied " + JSON.stringify(notif._userText));
          } else {
            AsyncStorage.setItem(
              "lastMessage",
              JSON.stringify(notif._userText)
            );
          }
        }
        if (notif._actionIdentifier === "view") {
          alert("User clicked View in App");
        }
        if (notif._actionIdentifier === "dismiss") {
          alert("User clicked Dismiss");
        }
      }, 1000);
    }
  }); */
}

// these callback will be triggered only when app is foreground or background
export function registerAppListener(navigation) {
  // this.removeNotificationListener
  // firebase.notifications().onNotification((notification) => {
  //   // Có thông báo mới
  //   console.log("open", notification);
  //   const { _body, _data, _title } = notification;
  //   // navigation.navigate(_data.targetScreen, { id: _data.id });
  //   if (Platform.OS === "android") {
  //     const localNotification = new firebase.notifications.Notification({
  //       sound: "default",
  //       show_in_foreground: true,
  //     })
  //       .setNotificationId(notification.notificationId)
  //       .setTitle(notification.title)
  //       .setSubtitle(notification.subtitle)
  //       .setBody(notification.body)
  //       .setData(notification.data)
  //       .android.setChannelId("channelId") // e.g. the id you chose above
  //       .android.setSmallIcon("ic_stat_notification") // create this icon in Android Studio
  //       .android.setColor("#000000") // you can set a color here
  //       .android.setPriority(firebase.notifications.Android.Priority.High);
  //
  //     firebase
  //       .notifications()
  //       .displayNotification(localNotification)
  //       .catch((err) => console.error(err));
  //   } else if (Platform.OS === "ios") {
  //     const localNotification = new firebase.notifications.Notification()
  //       .setNotificationId(notification.notificationId)
  //       .setTitle(notification.title)
  //       .setSubtitle(notification.subtitle)
  //       .setBody(notification.body)
  //       .setData(notification.data)
  //       .ios.setBadge(notification.ios.badge);
  //
  //     firebase
  //       .notifications()
  //       .displayNotification(localNotification)
  //       .catch((err) => console.error(err));
  //   }
  // });
  // // this.messageListener
  // firebase.messaging().onMessage((message: RemoteMessage) => {
  //   // Process your message as required
  // });
  // // this.removeNotificationDisplayedListener
  // firebase.notifications().onNotificationDisplayed((notification) => {
  //   console.warn(
  //     "FireBaseClient -> componentDidMount -> notification",
  //     notification._data
  //   );
  //   // Process your notification as required
  //   // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
  // });
  // //  this.removeNotificationOpenedListener
  // firebase.notifications().onNotificationOpened((notificationOpen) => {
  //   const action = notificationOpen.action;
  //   const notification = notificationOpen.notification;
  //   // console.warn("opened", notification);
  //   const _data = notification._data;
  //   let currentRoute = NavigationService.getCurrentRoute();
  //   // console.warn("registerAppListener -> currentRoute", currentRoute);
  //   if (_data) {
  //     if (currentRoute.routeName !== _data.targetScreen) {
  //       navigation.navigate(_data.targetScreen, {
  //         id: _data.id,
  //         ..._data,
  //       });
  //     } else {
  //       const replaceAction = StackActions.replace({
  //         routeName: _data.targetScreen,
  //         params: { ..._data },
  //       });
  //       navigation.dispatch(replaceAction);
  //     }
  //   }
  // });
  // // this.getInitialNotification
  // firebase
  //   .notifications()
  //   .getInitialNotification()
  //   .then((remoteMessage) => {
  //     console.warn(
  //       "FireBaseClient -> getInitialNotification -> notification",
  //       remoteMessage?.notification._data
  //     );
  //
  //     const _data = remoteMessage?.notification._data;
  //     if (_data) {
  //       navigation.navigate(_data.targetScreen, {
  //         id: _data.id,
  //         ...data,
  //       });
  //     }
  //   });
  // // this.getToken
  // firebase
  //   .messaging()
  //   .getToken()
  //   .then((token) => {
  //     console.log("FireBaseClient -> getToken -> token", token);
  //     AsyncStorage.setItem("fcmToken", token);
  //   });
  // // this.onTokenRefreshListener
  // firebase.messaging().onTokenRefresh((fcmToken) => {
  //   console.log("FireBaseClient -> componentDidMount -> fcmToken", fcmToken);
  // });
}
