import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Notification from "../../views/notification/Notification";
import DetailNotification from "../../views/notification/DetailNotification";
import Icon from "react-native-vector-icons/FontAwesome5";
import { colors } from "../../config/colors";

const NotificationStack = createStackNavigator({
  Information: {
    screen: Notification,
    navigationOptions: ({ navigation }) => ({
      headerLeft: () => (
        <Text
          style={{
            marginLeft: 16,
            color: "#fff",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Thông báo
        </Text>
      ),
      headerStyle: {
        backgroundColor: colors.main,
      },
      title: '',
    }),
  },
  DetailNotification: {
    screen: DetailNotification,
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: false,
      headerLeft: () => (
        <View style={styles.left}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
              if (navigation?.state?.params?.getNotification) {
                navigation?.state?.params?.getNotification();
              }
            }}
            style={styles.btnBack}
          >
            <Icon name={"arrow-left"} size={16} color="#fff" />
          </TouchableOpacity>
          <Text style={[styles.fs16, { color: "#fff", fontWeight: "bold" }]}>
            Chi tiết thông báo
          </Text>
        </View>
      ),
      headerStyle: {
        backgroundColor: colors.main,
      },
      title: '',
    }),
  },
});
NotificationStack.navigationOptions = ({ navigation }) => {
  let navigationOptions = {};
  if (navigation.state.index > 0) {
    navigationOptions.tabBarVisible = false;
  }
  return navigationOptions;
};

export default NotificationStack;

const styles = {
  left: { flexDirection: "row", alignItems: "center" },
  btnBack: { paddingHorizontal: 16, paddingVertical: 8 },
  fs16: { fontSize: 16 },
};
