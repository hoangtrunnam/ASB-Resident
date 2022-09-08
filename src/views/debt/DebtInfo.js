import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import styles from "./styles";
import { formatNumber, formatDate, isError } from "../../core/utils";
import { Button } from "../../components/Button";
// import TouchGradient from "@components/Shared/TouchGradient";
// import Icons from '@media/appIcon';
// import QRCode from 'react-native-qrcode-svg';
// import RNFS from 'react-native-fs';
// import CameraRoll from '@react-native-community/cameraroll';
import { searchModule } from "../../core/modules/search";
import { apiUrl } from "../../core/constanst";

class DebtInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.getPaymentInfo();
  }
  getPaymentInfo() {
    searchModule
      .executeSearch({
        ModuleID: "03515",
        SubModule: "MMN",
      })
      .then((searchResult) => {
        if (isError(searchResult)) {
          alert(searchResult.message);
          return;
        }
        this.setState({ data: searchResult?.result?.data[0] || [] });
        // this.setState({ refreshing: false });
      });
  }
  getDataURL() {
    this.svg.toDataURL(this.callback);
  }
  callback(dataURL) {
    console.log(dataURL);
  }
  saveQrToDisk = () => {
    Alert.alert("Thông báo", "Lưu QR thành công");
    return;
    this.svg.toDataURL((data) => {
      RNFS.writeFile(RNFS.CachesDirectoryPath + "/qr.png", data, "base64")
        .then((success) => {
          Alert.alert("Thông báo", "Lưu QR thành công");
          return CameraRoll.saveToCameraRoll(
            RNFS.CachesDirectoryPath + "/qr.png",
            "photo"
          );
        })
        .then(() => {
          this.setState({ busy: false, imageSaved: true });
        });
    });
  };
  render() {
    const tong_cong_no = this.props.navigation.getParam("tong_cong_no");
    const item = this.props.navigation.getParam("item") || [];
    let template = this.state.data?.TRANSFER_DESC_TEMPLATE;
    template = template?.replace("{APARTMENT_ID}", item[0]?.APARTMENT_CODE);
    template = template?.replace("{CONTENT}", item[0]?.NOTE);
    template = template?.replace("{VALUE}", formatNumber(tong_cong_no));

    return (
      <View style={styles.main_view}>
        <ScrollView>
          <View style={styles.giaodich_view}>
            <View style={styles.giaodich_row_view}>
              <View style={styles.giaodich_left}>
                <Text style={styles.giaodich_text_left}>Tên ngân hàng</Text>
              </View>
              <View style={styles.giaodich_right}>
                <Text style={styles.giaodich_text_right}>
                  {this.state.data?.BANK_NAME}
                </Text>
              </View>
            </View>
            <View style={styles.giaodich_row_view}>
              <View style={styles.giaodich_left}>
                <Text style={styles.giaodich_text_left}>Số tài khoản</Text>
              </View>
              <View style={styles.giaodich_right}>
                <Text style={styles.giaodich_text_right}>
                  {this.state.data?.ACCOUNT_NO}
                </Text>
              </View>
            </View>
            <View style={styles.giaodich_row_view}>
              <View style={styles.giaodich_left}>
                <Text style={styles.giaodich_text_left}>Tên chủ tài khoản</Text>
              </View>
              <View style={styles.giaodich_right}>
                <Text style={styles.giaodich_text_right}>
                  {this.state.data?.OWNER_NAME}
                </Text>
              </View>
            </View>

            <View style={styles.giaodich_row_view}>
              <View style={styles.giaodich_left}>
                <Text style={styles.giaodich_text_left}>Chi nhánh</Text>
              </View>
              <View style={styles.giaodich_right}>
                <Text style={styles.giaodich_text_right}>
                  {this.state.data?.BANKBRANCH_NAME}
                </Text>
              </View>
            </View>

            <View style={styles.giaodich_row_view}>
              <View style={styles.giaodich_left}>
                <Text style={styles.giaodich_text_left}>Tổng tiền</Text>
              </View>
              <View style={styles.giaodich_right}>
                <Text style={styles.giaodich_text_right}>
                  {formatNumber(tong_cong_no || "0")}
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.giaodich_row_view,
                {
                  flexDirection: "column",
                  alignSelf: "stretch",
                },
              ]}
            >
              <View style={[styles.giaodich_left]}>
                <Text style={styles.giaodich_text_left}>Nội dung CK</Text>
              </View>
              <View>
                <Text
                  style={[
                    styles.giaodich_text_right,
                    { fontWeight: "normal", marginTop: 12, lineHeight: 21 },
                  ]}
                >
                  {/* Họ tên / CMND / Chuyển tiền điện vào tài khoản ABC */}
                  {/*  Can ho: {this.state?.APARTMENT_ID}, Thanh toan tien{" "}
                  {this.state?.CONTENT}, Gia tri: {this.state?.VALUE}. */}
                  {template}
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.giaodich_row_view,
                { borderBottomWidth: 0, paddingBottom: 7 },
              ]}
            >
              <View style={styles.giaodich_left}>
                <Text style={styles.giaodich_text_left}>QR Code</Text>
              </View>
              <View style={styles.giaodich_right}>
                <Text style={styles.giaodich_text_right}>
                  {"Quét QR Code để thanh toán"}
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.giaodich_row_view,
                { borderBottomWidth: 0, flexDirection: "column" },
              ]}
            >
              <View style={{ padding: 12 }}>
                <Image
                  style={styles.QRCode_image}
                  source={{
                    uri: `${apiUrl}${
                      this.state.data?.QRCODE_IMAGE
                    }`,
                  }}
                  resizeMode="contain"
                />
                {/*  <QRCode
                  value={"https://github.com/hoanganhnh2009"}
                  getRef={c => (this.svg = c)}
                /> */}
              </View>
              {/*  <TouchableOpacity
                onPress={this.saveQrToDisk}
                style={styles.QRCode}
              >
                <Text style={styles.QRCode_text}>Lưu QR Code</Text>
              </TouchableOpacity> */}
            </View>
          </View>
          <Button
            onPress={() => this.props.navigation.goBack()}
            title="Hoàn thành"
          />
        </ScrollView>
      </View>
    );
  }
}

export default DebtInfo;
