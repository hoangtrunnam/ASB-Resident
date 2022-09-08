import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Button } from "../../../components/Button";

class InforCard extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const type = navigation.getParam("type");
    const getHeaderType = navigation.getParam("getHeaderType");
    if (!type)
      return {
        headerLeft: null,
        headerRight: null
      };
    return {
      headerLeft: () => (
        <View style={styles.left}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.btnBack}
          >
            <Icon name={"arrow-left"} size={16} />
          </TouchableOpacity>
          {type === "info" ? (
            <Text style={[styles.fs16]}>Thông tin thẻ xe</Text>
          ) : (
            <Text style={[styles.fs16]}>Sửa thông tin thẻ xe</Text>
          )}
        </View>
      ),
      headerRight: () =>
        type === "info" ? (
          <TouchableOpacity
            style={{ paddingHorizontal: 16 }}
            onPress={() => {
              navigation.setParams({ type: "edit" });
              getHeaderType("edit");
            }}
          >
            <Text style={{ color: "#3784FF", fontSize: 16 }}>Sửa</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ paddingHorizontal: 16 }}
            onPress={() => {
              navigation.setParams({ type: "info" });
              getHeaderType("info");
            }}
          >
            <Text style={{ color: "#3784FF", fontSize: 16 }}>Lưu</Text>
          </TouchableOpacity>
        )
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      type: "info"
    };
    this.getHeaderType = this.getHeaderType.bind(this);
  }

  componentDidMount() {
    const { type } = this.state;
    this.setHeader(type);
  }
  setHeader(type) {
    this.props.navigation.setParams({
      type,
      getHeaderType: this.getHeaderType
    });
  }

  getHeaderType(type) {
    this.setState({ type });
  }

  render() {
    const { item } = this.props.navigation.state.params;
    const { type } = this.state;
    return (
      <View style={{ backgroundColor: "#eee", flex: 1 }}>
        <ScrollView style={{ sflex: 1 }} scrollEnabled={false}>
          <View style={styles.cardMenu}>
            <Text style={styles.name}>{item.name}</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Căn hộ</Text>
              <TextInput value={item.department} style={{ color: "#000" }} />
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Biển số</Text>
              <TextInput value={item.number} style={{ color: "#000" }} />
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Thẻ xe</Text>
              <TextInput value={item.id} style={{ color: "#000" }} />
            </View>
          </View>
        </ScrollView>
        {type === "info" && (
          <View style={{ marginHorizontal: 16 }}>
            <Button
              title={"Xoá"}
              styleButton={{
                backgroundColor: "transparent",
                borderColor: "red",
                borderWidth: 1
              }}
              styleTitle={{ color: "red" }}
            />
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  cardMenu: {
    backgroundColor: "#fff",
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
    justifyContent: "center"
  },
  name: { color: "#323232", fontWeight: "bold" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 16
  },
  label: { color: "#666" },
  left: { flexDirection: "row", alignItems: "center" },
  btnBack: { paddingHorizontal: 16, paddingVertical: 8 },
  fs16: { fontSize: 16 }
});

export default InforCard;
