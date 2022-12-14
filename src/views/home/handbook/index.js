import React from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { connect } from "react-redux";
import { actions as actionsRequest } from "../../requirement/action";
import { Ultils } from "../../../config/Ultils";
import { executeSearch, pageSize } from "../../../core/services";
import { getSessionKey, isError } from "../../../core/utils";

class Apartment extends React.Component {
  static navigationOptions = () => ({
    title: '',
  });

  constructor(props) {
    super(props);
    this.state = {
      handbooks: [],
    };
  }

  async componentDidMount() {
    this.getHanBook();
  }
  async getHanBook() {
    let searchResult = await executeSearch({
      moduleInfo: {
        ModuleID: "03514",
        SubModule: "MMN",
      },
      values: [],
      conditions: [],
      data: {
        pageSize: pageSize,
      },
      sessionId: await getSessionKey(),
    });
    console.log(searchResult);
    if (isError(searchResult)) {
      alert(searchResult.message);
      return;
    }
    this.setState({ handbooks: searchResult.result.data });
    // this.props.onGetApartment(searchResult.result.data || [])
  }
  render() {
    const { navigation, apartments } = this.props;
    const { handbooks } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={handbooks}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.cardMenu}
              onPress={() => navigation.navigate("HandBookDetail", { item })}
            >
              <View style={{ flexDirection: "row" }}>
                <View style={{ marginRight: 8 }}>
                  <View
                    style={{
                      borderRadius: 8,
                      backgroundColor: "#3784ff",
                      padding: 6,
                    }}
                  >
                    <Icon name={"building"} size={20} color={"#fff"} />
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.row}>
                    <Text>{item.TITLE}</Text>
                  </View>
                  {/*   <View style={styles.row}>
                    <Text style={styles.label}>D??? ??n</Text>
                    <Text>{item.PROJECT_FULLNAME}</Text>
                  </View> */}
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  cardMenu: {
    backgroundColor: "#fff",
    marginTop: 16,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 8,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: { color: "#323232", fontWeight: "bold" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 16,
  },
  label: { color: "#666" },
  left: { flexDirection: "row", alignItems: "center" },
  btnBack: { paddingHorizontal: 16, paddingVertical: 8 },
  fs16: { fontSize: 16 },
});
const mstp = (state) => ({
  apartments: state.RequestReducer.apartments,
});
const mdtp = (dispatch) => ({
  onGetApartment: (data) => dispatch(actionsRequest.getUserApartment(data)),
});
export default connect(
  mstp,
  mdtp
)(Apartment);
