import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ultils } from "../../config/Ultils";
import Icon from "react-native-vector-icons/FontAwesome";
import { searchModule } from "../../core/modules/search";
import { ModuleInfos } from "../../core/moduleList";
import { isError } from "../../core/utils";
import Ionicons from "react-native-vector-icons/Ionicons";
import { translateCodeByCodeValue, translateCodeSync } from "../../core/services";
import { colors } from "../../config/colors";
class CustomerInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: {},
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { customer } = navigation.state.params;
    
    const name = customer.MEMBER_NAME;
    return {
      headerLeft: () => (
        <View style={styles.left}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.btnBack}
          >
            <Icon name={"arrow-left"} size={16} color={"#fff"} />
          </TouchableOpacity>
          <Text
            numberOfLines={1}
            style={[
              styles.fs16,
              { color: "#fff", flex: 1, fontWeight: "bold" },
            ]}
          >
            {name}
          </Text>
        </View>
      ),
      headerStyle: {
        backgroundColor: colors.main,
      },
      title: '',
    };
  };
  componentDidMount() {
    const { isInfo } = this.props.navigation.state.params;
    if (isInfo) {
      this.getUserInfo();
    }
  }
  getUserInfo() {
    searchModule
      .executeSearch({
        ModuleID: "03504",
        SubModule: "MMN",
      })
      .then((res) => {
        if (isError(res)) {
          alert(res.message);
          return;
        }
        const {
          BIRTH_DATE,
          EMAIL,
          CUSTOMER_NAME,
          PHONE,
          ADDRESS,
        } = res?.result?.data[0];
        this.setState({
          customer: {
            BIRTH_DATE,
            PHONE,
            ADDRESS,
            EMAIL,
          },
        });
      });
  }
  render() {
    const { customer } = this.props.navigation.state.params;
    console.log(customer);
    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <View style={{ alignItems: "center", marginBottom: 8 }}>
            <Text
              style={{
                fontSize: 20,
                marginTop: 20,
                marginBottom: 8,
                fontWeight: "bold",
              }}
            >
              {customer?.CUSTOMER_NAME || customer.MEMBER_NAME}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={{ color: "#888888", fontSize: 16 }}>
              Số điện thoại
            </Text>
            <Text style={{ color: "#323232", fontWeight: "bold" }}>
              {customer?.PHONE_NUMBER || this.state.customer?.PHONE_NUMBER || customer.MEMBER_PHONE_NUMBER}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={{ color: "#888888", fontSize: 16 }}>Ngày sinh</Text>
            <Text style={{ color: "#323232", fontWeight: "bold" }}>
              {this.state.customer?.MEMBER_BIRTH_DATE &&
                Ultils.convertDate(this.state.customer?.MEMBER_BIRTH_DATE)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={{ color: "#888888", fontSize: 16 }}>Email</Text>
            <Text style={{ color: "#323232", fontWeight: "bold" }}>
              {customer?.EMAIL || this.state.customer?.MEMBER_EMAIL}
            </Text>
          </View>
          <View style={[styles.row, { alignItems: "flex-start" }]}>
            <Text style={{ color: "#888888", fontSize: 16 }}>Thành viên</Text>
            <Text
              style={{
                flex: 1,
                marginLeft: 16,
                fontWeight: "500",
                textAlign: "right",
              }}
            >
              {customer?.MEMBER_TYPE || this.state.customer?.MEMBER_TYPE}
            </Text>
          </View>
          <View style={[styles.row, { alignItems: "flex-start" }]}>
            <Text style={{ color: "#888888", fontSize: 16 }}>Mối quan hệ</Text>
            <Text
              style={{
                flex: 1,
                marginLeft: 16,
                fontWeight: "500",
                textAlign: "right",
              }}
            >
              {translateCodeByCodeValue(':BMS_APARTMENT.RELATIVE', customer?.RELATIVE || this.state.customer?.RELATIVE)}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", margin: 16 },
  item: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    marginTop: 60,
  },
  avatar: { width: 60, height: 60, borderRadius: 30 },
  fs16: { fontSize: 16 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E4E4E4",
  },
  name: { color: "#323232", fontWeight: "bold" },
  label: { color: "#666" },
  left: { flexDirection: "row", alignItems: "center", flex: 1 },
  btnBack: { paddingHorizontal: 16, paddingVertical: 8 },
});

export default CustomerInformation;
