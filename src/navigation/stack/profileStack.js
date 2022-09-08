import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Profile from "../../views/profile/Profile";
import ChangePassword from "../../views/profile/ChangePassword";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import CustomerInformation from "../../views/profile/CustomerInfo";
import { defaultOptions } from "../helpers";
import { colors } from "../../config/colors";
const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: ({ navigation }) => ({
        title: "Tài khoản",
        headerBackTitle: null,
        headerStyle: {
          backgroundColor: colors.main
        },
        headerTitleStyle: {
          color: "#fff"
        }
      })
    },
    CustomerInfo: {
      screen: CustomerInformation
    },
    ChangePassword: {
      screen: ChangePassword,
      navigationOptions: ({ navigation }) => ({
        title: "",
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: colors.main
        },
        headerTitleStyle: {
          color: "#fff",
          textAlign: "left",
          flex: 1,
          marginLeft: -35
        }
      })
    }
  },
  {
    defaultNavigationOptions: {
      headerTitleStyle: { textAlign: "left", flex: 1 }
    }
  }
);
ProfileStack.navigationOptions = ({ navigation }) => {
  let navigationOptions = {};
  if (navigation.state.index > 0) {
    navigationOptions.tabBarVisible = false;
  }
  return navigationOptions;
};

export default ProfileStack;
