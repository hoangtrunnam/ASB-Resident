import React from "react";
import { View, Text } from "react-native";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Home from "../stack/homeStack";
import Notification from "../stack/notificationStack";
import Profile from "../stack/profileStack";
import Icon from "react-native-vector-icons/FontAwesome5";
import Requirement from "../stack/requirementStack";
import IconWithBadge from "../IconWithBadge";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../config/colors";

function tabBarVisible(navigation) {
  const { routes } = navigation.state;
  let showTabbar = true;
  routes.forEach((route) => {
    if (route.routeName === "DetailRequirement") {
      showTabbar = false;
    }
  });

  return showTabbar;
}

export default createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => {
        const active = navigation.isFocused();
        return {
          tabBarIcon: ({ tintColor }) => (
            <Ionicons name={"ios-home"} color={tintColor} size={22} />
          ),
          tabBarLabel: "Trang chủ",
          tabBarOptions: {
            activeTintColor: colors.main,
            inactiveTintColor: "#999999",
          },
        };
      },
    },
    Requirement: {
      screen: Requirement,
      navigationOptions: ({ navigation }) => {
        const active = navigation.isFocused();
        return {
          tabBarIcon: ({ tintColor, size }) => (
            <Ionicons name={"md-clipboard"} color={tintColor} size={25} />
          ),
          tabBarLabel: "Phản ánh",
          tabBarOptions: {
            activeTintColor: colors.main,
            inactiveTintColor: "#999999",
          },
          tabBarVisible: tabBarVisible(navigation),
        };
      },
    },
    Notification: {
      screen: Notification,
      navigationOptions: ({ navigation }) => {
        const active = navigation.isFocused();
        return {
          tabBarIcon: ({ tintColor, size }) => (
            <IconWithBadge
              badgeCount={0}
              name="ios-notifications"
              size={22}
              color={tintColor}
            />
          ),
          tabBarLabel: "Thông báo",
          tabBarOptions: {
            activeTintColor: colors.main,
            inactiveTintColor: "#999999",
          },
        };
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: ({ navigation }) => {
        const active = navigation.isFocused();
        return {
          tabBarIcon: ({ tintColor }) => (
            <Ionicons name={"ios-person"} color={tintColor} size={25} />
          ),
          tabBarLabel: "Tài khoản",
          tabBarOptions: {
            activeTintColor: colors.main,
            inactiveTintColor: "#999999",
          },
        };
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: colors.main,
      inactiveTintColor: "#999999",
      showIcon: true,
    },
  }
);

const styles = {
  tabActive: { alignItems: "center", padding: 8, borderRadius: 30 },
  label: { fontSize: 12, marginTop: 4 },
};
