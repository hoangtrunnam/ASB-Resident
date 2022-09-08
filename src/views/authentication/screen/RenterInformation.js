import React from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { SafeAreaView } from "react-navigation";
import { Button } from "../../../components/Button";
import { connect } from "react-redux";
import { Ultils } from "../../../config/Ultils";
import { actions } from "../action";
import { colors } from "../../../config/colors";

class RenterInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ownerPhone: "", //0975624251
      renterPhone: "", //0988010201
    };
    this.handleRenterRegister = this.handleRenterRegister.bind(this);
  }

  handleRenterRegister() {
    const { renterPhone, ownerPhone } = this.state;
    if (!renterPhone) {
      Alert.alert("Thông báo", "Vui lòng nhập số điện thoại");
    } else {
      this.props.onRenterRegister({
        UserName: renterPhone,
        OwnerPhone: ownerPhone,
      });
    }
  }

  render() {
    const { navigation } = this.props;
    const { ownerPhone, renterPhone } = this.state;
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
          <Text style={styles.txtInfor}>
            Số điện thoại chủ hộ đăng ký hồ sơ{" "}
            <Text style={styles.tnr}>ECO</Text>
          </Text>
          <TextInput
            style={Ultils.ios ? styles.input : styles.inputAndroid}
            placeholder={"Nhập số điện thoại chủ hộ"}
            placeholderTextColor={"#888"}
            keyboardType={"numeric"}
            returnKeyLabel={"Done"}
            returnKeyType={"done"}
            value={ownerPhone}
            onChangeText={(ownerPhone) => this.setState({ ownerPhone })}
          />
          <Text style={styles.txtInfor}>Số điện thoại khách thuê</Text>
          <TextInput
            style={Ultils.ios ? styles.input : styles.inputAndroid}
            placeholder={"Nhập số điện thoại khách thuê"}
            placeholderTextColor={"#888"}
            keyboardType={"numeric"}
            returnKeyLabel={"Done"}
            returnKeyType={"done"}
            value={renterPhone}
            onChangeText={(renterPhone) => this.setState({ renterPhone })}
          />
        </View>
        <View style={styles.bottom}>
          <Text style={styles.txtInfor}>
            Bằng việc chọn Tiếp tục, bạn đồng ý với{" "}
            <Text style={styles.link}>Điều khoản & Điều kiện</Text> của{" "}
            <Text style={styles.tnr}>ECO</Text>
          </Text>
          <Button title={"Tiếp tục"} onPress={this.handleRenterRegister} />
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
const mstp = (state) => ({});

const mdtp = (dispatch) => ({
  onRenterRegister: (data) => dispatch(actions.renterRegister(data)),
});

export default connect(
  mstp,
  mdtp
)(RenterInformation);
