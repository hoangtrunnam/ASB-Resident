import React from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { SafeAreaView } from "react-navigation";
import { Button } from "../../../components/Button";
import { connect } from "react-redux";
import { actions } from "../action";
import { Ultils } from "../../../config/Ultils";
import { colors } from "../../../config/colors";

class SetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "", //123
      rePassword: "", //123
    };
  }

  _setPassword = () => {
    const { rePassword, password } = this.state;
    const { UserName, appKey, user_type, apartmentId, OwnerPhone } = this.props;
    // console.warn("SetPassword -> _setPassword -> apartmentId", apartmentId);
    if (!password && !rePassword) {
      Alert.alert("Thông báo", "Yêu cầu nhập mật khẩu");
    } else if (password !== rePassword) {
      Alert.alert("Thông báo", "Mật khẩu nhập lại không đúng");
    } else {
      /* this.props.setPassword({
        phoneNumber,
        rePassword,
        password,
        otpKey: appKey,
      }); */
      this.props.setPassword({
        UserName: UserName,
        Password: password,
        VertifiedPassword: rePassword,
        CustType: 1, //"1":Cư dân "2": Khách thuê
        ApartmentId: apartmentId, //20
        OwnerPhone: OwnerPhone, //Số điện thoại chủ hộ : 0975624251
      });
    }
  };

  render() {
    const { navigation } = this.props;
    const { rePassword, password } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.infor}>
          <Text style={styles.txtLabel}>Mật khẩu</Text>
          <TextInput
            style={Ultils.ios ? styles.input : styles.inputAndroid}
            placeholder={"Nhập số điện thoại chủ hộ"}
            placeholderTextColor={"#888"}
            keyboardType={"numeric"}
            returnKeyLabel={"Done"}
            returnKeyType={"done"}
            value={password}
            onChangeText={(password) => this.setState({ password })}
          />
          <Text style={styles.txtLabel}>Xác nhận mật khẩu</Text>
          <TextInput
            style={Ultils.ios ? styles.input : styles.inputAndroid}
            placeholder={"Nhập lại mật khẩu"}
            placeholderTextColor={"#888"}
            keyboardType={"numeric"}
            returnKeyLabel={"Done"}
            returnKeyType={"done"}
            value={rePassword}
            onChangeText={(rePassword) => this.setState({ rePassword })}
          />
        </View>
        <View style={styles.bottom}>
          <Button title={"Đăng ký"} onPress={this._setPassword} />
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
  txtLabel: { color: "#444", fontWeight: "600" },
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
  UserName: state.AuthReducer.UserName,
  appKey: state.AuthReducer.appKey,
  user_type: state.AuthReducer.user_type,
  apartmentId: state.AuthReducer.apartmentId,
  OwnerPhone: state.AuthReducer.OwnerPhone,
});
const mdtp = (dispatch) => ({
  setPassword: (data) => dispatch(actions.setPassword(data)),
});

export default connect(
  mstp,
  mdtp
)(SetPassword);
