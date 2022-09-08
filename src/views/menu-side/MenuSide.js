import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import { Ultils } from "../../config/Ultils";
import Icon from "react-native-vector-icons/FontAwesome5";

const languages = [
  { label: "Tiếng Việt", value: "vi" },
  { label: "Tiếng Anh", value: "en" }
];
const menu = [
  { label: "Thông báo", screen: "Notification", icon: "bell" },
  { label: "Yêu cầu", screen: "Notification", icon: "clipboard-list" },
  // {label: 'Lịch sử thanh toán', screen: 'Notification', icon: 'credit-card'},
  // {label: 'Công nợ', screen: 'Notification', icon: 'file-invoice-dollar'},
  // {label: 'Thẻ xẻ', screen: 'Notification', icon: 'car'},
  { label: "Quản lý căn hộ", screen: "Notification", icon: "building" },
  { label: "Cá nhân", screen: "Notification", icon: "user" }
];

class MenuSide extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/bg_red.png")}
          style={styles.image}
        >
          <Image
            source={require("../../assets/images/logo_white.png")}
            style={styles.avatar}
            resizeMode={"contain"}
          />
          <Text style={styles.username}>Hoan Vu</Text>
        </ImageBackground>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.viewMenu}>
            <FlatList
              data={languages}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.row}>
                  <Icon name={"circle"} size={18} />
                  <Text style={{ marginLeft: 8, color: "#444" }}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={false}
            />
          </View>
          <View style={styles.viewMenu}>
            <FlatList
              data={menu}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.row}>
                  <Icon name={item.icon} size={18} solid color={"#DFA42E"} />
                  <Text style={{ marginLeft: 8, color: "#444444" }}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={false}
            />
          </View>
          <View style={[styles.row, styles.viewMenu, styles.noBorder]}>
            <Icon name={"info-circle"} size={18} solid color={"#DFA42E"} />
            <Text style={{ marginLeft: 8, color: "#444444" }}>Giới thiệu</Text>
          </View>
          <TouchableOpacity
            style={[styles.viewMenu, styles.row, styles.noBorder]}
            onPress={this.logout}
          >
            <Icon name={"sign-out-alt"} size={18} solid color={"#DFA42E"} />
            <Text style={{ marginLeft: 8, color: "#444444" }}>Đăng xuất</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, overflow: "hidden" },
  image: {
    height: Ultils.dimensions.height / 4,
    justifyContent: "center",
    alignItems: "center"
  },
  avatar: {
    width: Ultils.dimensions.width / 5,
    height: Ultils.dimensions.width / 5
  },
  username: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    paddingVertical: 4
  },
  viewMenu: {
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    marginHorizontal: 16,
    paddingBottom: 16
  },
  noBorder: { borderBottomWidth: 0 }
});

export default MenuSide;
