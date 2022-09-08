import React from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { SafeAreaView } from "react-navigation";
import { Button } from "@components/Button";
import { connect } from "react-redux";
import { actions } from "../action";
import { Ultils } from "../../../config/Ultils";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../../config/colors";

class VerifyOTP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oTPCode: "",
      isResend: false,
      timer: 180,
    };
    this.navigateScreen = this.navigateScreen.bind(this);
    this.changeNumber = this.changeNumber.bind(this);
    this.resendOTP = this.resendOTP.bind(this);
  }

  navigateScreen() {
    const { user_type, UserName, appKey } = this.props;
    const { oTPCode } = this.state;
    const data = {
      UserName: UserName,
      OTPCode: oTPCode || appKey,
    };
    if (!oTPCode && !appKey) {
      Alert.alert("Thông báo", "Vui lòng nhập mã xác thực OTP");
    } else {
      this.props.verifyOTP(data, user_type);
    }
  }

  changeNumber() {
    this.props.navigation.goBack();
  }

  resendOTP() {
    const { UserName } = this.props;
    this.props.onResendOTP({ UserName });
  }

  render() {
    const { UserName, appKey } = this.props;
    const { oTPCode } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.infor}>
          <Text style={styles.txtInfor}>
            Điền OTP vừa được gửi đến số điện thoại
          </Text>
          <Text style={styles.phone}>{UserName}</Text>
          <View style={[styles.inputOTP]}>
            <TextInput
              style={Ultils.ios ? styles.input : styles.inputAndroid}
              placeholder={"Nhập mã OTP"}
              placeholderTextColor={"#888"}
              keyboardType={"numeric"}
              returnKeyLabel={"Done"}
              returnKeyType={"done"}
              value={oTPCode || appKey}
              onChangeText={(oTPCode) => this.setState({ oTPCode })}
            />
            <Text style={styles.countdown}>{this.state.timer} s</Text>
          </View>
        </View>
        <View style={styles.bottom}>
          <View style={styles.handleOTP}>
            <Text
              style={{ color: "#3784FF", fontWeight: "500" }}
              onPress={this.changeNumber}
            >
              Đổi số điện thoại
            </Text>
            <TouchableOpacity onPress={() => alert("resend")}>
              <Text
                style={{ color: "#888", fontWeight: "500" }}
                onPress={this.resendOTP}
              >
                Gửi lại OTP
              </Text>
            </TouchableOpacity>
          </View>
          <Button title={"Tiếp tục"} onPress={() => this.navigateScreen()} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  notice: {
    backgroundColor: "#FFF2E9",
    padding: 16,
    alignItems: "center",
    flexDirection: "row",
  },
  phone: { color: "#000", fontWeight: "600", fontSize: 16, marginVertical: 16 },
  txtInfor: { color: "#888", fontWeight: "600" },
  infor: { margin: 16, flex: 1 },
  tnr: { color: "#000", fontWeight: "600" },
  inputOTP: { flexDirection: "row", alignItems: "center" },
  input: {
    flex: 1,
    color: "#000",
    fontWeight: "500",
    height: 32,
    marginRight: 16,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  inputAndroid: {
    color: "#000",
    fontWeight: "500",
    paddingVertical: 8,
    marginVertical: 8,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    flex: 1,
  },
  link: { color: colors.main, fontWeight: "600", flex: 1 },
  bottom: { marginHorizontal: 16 },
  countdown: { color: "#DA0F2D" },
  handleOTP: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
});

const mstp = (state) => ({
  user_type: state.AuthReducer.user_type,
  UserName: state.AuthReducer.UserName,
  appKey: state.AuthReducer.appKey,
  apartmentId: state.AuthReducer.ApartmentId,
});
const mdtp = (dispatch) => ({
  verifyOTP: (data, user_type) => dispatch(actions.verifyOTP(data, user_type)),
  onResendOTP: (data) => dispatch(actions.resendOTP(data)),
});
export default connect(
  mstp,
  mdtp
)(VerifyOTP);
