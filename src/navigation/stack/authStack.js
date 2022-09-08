import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Introduction from "../../views/authentication/screen/Introduction";
import RenterInformation from "../../views/authentication/screen/RenterInformation";
import Icon from "react-native-vector-icons/FontAwesome5";
import VerifyOTP from "../../views/authentication/screen/VerifyOTP";
import ChooseProject from "../../views/authentication/screen/ChooseProject";
import EnterInformation from "../../views/authentication/screen/EnterInformation";
import ResidentInformation from "../../views/authentication/screen/ResidentInformation";
import SetPassword from "../../views/authentication/screen/SetPassword";
import Login from "../../views/authentication/screen/Login";
import ForgotPassword from "../../views/authentication/screen/ForgotPassword";

const authStack = createStackNavigator(
  {
    Introduction: {
      screen: Introduction,
      navigationOptions: () => ({
        header: null,
        headerBackTitle: null
      })
    },
    RenterInformation: {
      screen: RenterInformation,
      navigationOptions: ({ navigation }) => ({
        headerLeft: () => (
          <View style={styles.left}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.btnBack}
            >
              <Icon name={"arrow-left"} size={16} />
            </TouchableOpacity>
            <Text style={styles.fs16}>Thông tin đăng ký</Text>
          </View>
        )
      })
    },
    VerifyOTP: {
      screen: VerifyOTP,
      navigationOptions: ({ navigation }) => ({
        headerLeft: () => (
          <View style={styles.left}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.btnBack}
            >
              <Icon name={"arrow-left"} size={16} />
            </TouchableOpacity>
            <Text style={styles.fs16}>Mã xác thực OTP</Text>
          </View>
        )
      })
    },
    EnterInformation: {
      screen: EnterInformation,
      navigationOptions: ({ navigation }) => ({
        headerLeft: () => (
          <View style={styles.left}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.btnBack}
            >
              <Icon name={"arrow-left"} size={16} />
            </TouchableOpacity>
            <Text style={styles.fs16}>Thông tin đăng ký</Text>
          </View>
        )
      })
    },
    ResidentInformation: {
      screen: ResidentInformation,
      navigationOptions: ({ navigation }) => ({
        headerLeft: () => (
          <View style={styles.left}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.btnBack}
            >
              <Icon name={"arrow-left"} size={16} />
            </TouchableOpacity>
            <Text style={styles.fs16}>Thông tin cư dân</Text>
          </View>
        )
      })
    },
    SetPassword: {
      screen: SetPassword,
      navigationOptions: ({ navigation }) => ({
        headerLeft: () => (
          <View style={styles.left}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.btnBack}
            >
              <Icon name={"arrow-left"} size={16} />
            </TouchableOpacity>
            <Text style={styles.fs16}>Mật khẩu</Text>
          </View>
        )
      })
    },
    Login: {
      screen: Login,
      navigationOptions: () => ({
        header: null
      })
    },
    ForgotPassword: {
      screen: ForgotPassword,
      navigationOptions: ({ navigation }) => ({
        headerLeft: () => (
          <View style={styles.left}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.btnBack}
            >
              <Icon name={"arrow-left"} size={16} />
            </TouchableOpacity>
            <Text style={styles.fs16}>Quên mật khẩu</Text>
          </View>
        )
      })
    }
  },
  {
    initialRouteName: "Login"
  }
);
const styles = StyleSheet.create({
  left: { flexDirection: "row", alignItems: "center" },
  btnBack: { paddingHorizontal: 16, paddingVertical: 8 },
  fs16: { fontSize: 16 }
});
export default createAppContainer(authStack);
