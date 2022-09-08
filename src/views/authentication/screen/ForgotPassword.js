import React from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { SafeAreaView } from "react-navigation";
import { Button } from "../../../components/Button";
import { connect } from "react-redux";
import { actions } from "../action";
import { Ultils } from "../../../config/Ultils";
import { colors } from "../../../config/colors";

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
    };
  }

  handleNext = () => {
    const { phoneNumber } = this.state;
    if (!phoneNumber) {
      Alert.alert("Thông báo", "Vui lòng nhập số điện thoại chủ hộ");
    } else {
      this.props.onResendOTP({ phoneNumber });
    }
  };

  render() {
    const { navigation } = this.props;
    const { phoneNumber } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.notice}>
          <Icon
            name={"info-circle"}
            size={20}
            color={"#ED6A4E"}
            style={{ marginRight: 16 }}
          />
          <Text style={styles.txtNotice}>
            Thông tin phải trùng khớp với thông tin đã đăng ký tại{" "}
            <Text style={styles.tnr}>ECO</Text>
          </Text>
        </View>
        <View style={styles.infor}>
          <TextInput
            style={Ultils.ios ? styles.input : styles.inputAndroid}
            placeholder={"Nhập số điện thoại"}
            placeholderTextColor={"#888"}
            keyboardType={"numeric"}
            returnKeyLabel={"Done"}
            returnKeyType={"done"}
            value={phoneNumber}
            onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
          />
        </View>
        <View style={styles.bottom}>
          <Text style={styles.txtInfor}>
            Bằng việc chọn Tiếp tục, bạn đồng ý với{" "}
            <Text style={styles.link}>Điều khoản & Điều kiện</Text> của{" "}
            <Text style={styles.tnr}>ECO</Text>
          </Text>
          <Button title={"Tiếp tục"} onPress={this.handleNext} />
        </View>
      </View>
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
  txtNotice: { flex: 1, color: "#888" },
  txtInfor: { color: "#888", fontWeight: "600" },
  infor: { margin: 16, flex: 1 },
  tnr: { color: "#000", fontWeight: "600" },
  input: {
    width: "100%",
    color: "#000",
    fontWeight: "500",
    height: 32,
    marginVertical: 16,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  inputAndroid: {
    width: "100%",
    color: "#000",
    fontWeight: "500",
    paddingVertical: 8,
    marginVertical: 8,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  link: { color: colors.main, fontWeight: "600", flex: 1 },
  bottom: { marginHorizontal: 16 },
});
const mstp = (state) => ({
  error: state.AuthReducer.error,
});
const mdtp = (dispatch) => ({
  onResendOTP: (data) => dispatch(actions.resendOTP(data)),
});

export default connect(
  mstp,
  mdtp
)(ForgotPassword);
