import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  RefreshControl,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { connect } from "react-redux";
import { actions } from "./action";
import { Ultils } from "../../config/Ultils";
import { actions as actionApp } from "../../redux/action";
import { searchModule } from "../../core/modules/search";
import { ModuleInfos } from "../../core/moduleList";
import { isError, formatDate, getSessionKey } from "../../core/utils";
import {
  translateCode,
  getCodes,
  translateCodeByCodeValue,
  getListSource,
} from "../../core/services";
import AsyncStorage from "@react-native-community/async-storage";
import { CONST } from "../../constant/const";
import { colors } from "../../config/colors";

class Requirement extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: () => (
      <View style={styles.left}>
        <Text style={[styles.fs16, { color: "#fff" }]}>Phản ánh</Text>
      </View>
    ),
    headerStyle: {
      backgroundColor: colors.main,
    },
    title: '',
  });
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      requestTypeList: [{ TEXT: "Tất cả", VALUE: "" }],
      activeType: "",
      loading: true,
    };
    this.onTypeChange = this.onTypeChange.bind(this);
  }

  async componentDidMount() {
    this.getListSourceRequestType();
    this.getRequestList();
  }

  async getRequestList() {
    const DEPARTMENT = await AsyncStorage.getItem(CONST.DEPARTMENT);
    this.setState({ refreshing: true });
    searchModule
      .executeSearch(ModuleInfos.getRequestList, [], 9999, [
      {
        "ConditionID": "D99",
        "Operator": "003",
        "Value": DEPARTMENT,
        "ID": 1
      }
    ])
      .then((searchResult) => {
        console.log('getRequestList', searchResult);
        if (isError(searchResult)) {
          alert(searchResult.message);
          return;
        }
        this.props.onGetRequest(searchResult.result.data || []);
        this.setState({ refreshing: false, loading: false });
      });
  }

  onTypeChange = (item, index) => {
    // console.log('onTypeChange', item);
    this.refRequest.scrollToIndex({ index, viewOffset: 32 });
    requestAnimationFrame(() => {
      this.setState({ activeType: item.VALUE });
    });
  };

  async getListSourceRequestType() {
    const lst = await getListSource({
      moduleInfo: ModuleInfos.getRequestList,
      data: { FieldId: "L05", ListSource: "PKG_RG.SOURCE_REQUEST_TYPE()" },
      sessionId: await getSessionKey(),
      values: [],
      conditions: [],
    });
    if (isError(lst)) {
      alert(lst.message);
    }
    const { requestTypeList } = this.state;
    this.setState({
      requestTypeList: requestTypeList.concat(lst.result),
    });
  }
  getCountByReqId(activeType) {
    const { request } = this.props;
    const _request = activeType
      ? request.filter((e) => e.REQTYPE_ID === activeType)
      : request;
    return _request.length;
  }
  renderItem = ({ item, index }) => {
    // console.log("renderItem -> item", item);
    return (
      <TouchableOpacity
        style={styles.item}
        activeOpacity={0.8}
        onPress={() =>
          this.props.navigation.navigate("DetailRequirement", {
            request: item,
            id: item.REQ_ID,
          })
        }
      >
        <View style={{ padding: 16 }}>
          <Text style={{ fontWeight: "500" }}>{item.TITLE}</Text>
          <Text style={{ color: "#888888", paddingVertical: 5 }}>
            {item.APARTMENT_CODE} {item.PROJECT_NAME}
            {/*  {item.BUILDING_CODE} */}
          </Text>
          <Text style={{ color: "#888888" }}>
            Dự kiến hoàn thành:{" "}
            <Text style={{ color: "#000" }}>
              {formatDate(item.EXPIRED_DATE)}
            </Text>
          </Text>
        </View>
        <View
          style={[
            styles.itemBot,
            {
              backgroundColor: Ultils.getStatusRequest(item.STATUS)
                ?.backgroundColor,
            },
          ]}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: Ultils.getStatusRequest(item.STATUS)?.color,
            }}
          >
            {translateCodeByCodeValue(":BMS_REQUEST.STATUS", item.STATUS)}
          </Text>
          <Text style={{ fontWeight: "bold", color: "#323232" }}>
            {formatDate(item.REQUEST_DATE)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    const { navigation, request, codes, refresh } = this.props;
    const { refreshing, requestTypeList, activeType } = this.state;
    const _request = activeType
      ? request.filter((e) => e.REQTYPE_ID === activeType)
      : request;
    return (
      <View style={styles.container}>
        <View style={{ marginTop: 16 }}>
          <FlatList
            ref={(ref) => (this.refRequest = ref)}
            data={requestTypeList}
            renderItem={({ item, index }) => (
              <View style={{ marginLeft: 12, paddingBottom: 10 }}>
                <TouchableOpacity
                  style={[
                    styles.status,
                    {
                      backgroundColor:
                        activeType == item.VALUE ? "#FBE9EC" : "transparent",
                      borderWidth: 1,
                      borderColor:
                        activeType == item.VALUE ? "#FBE9EC" : "#DDD",
                    },
                  ]}
                  onPress={() => this.onTypeChange(item, index)}
                >
                  <Text
                    style={{
                      color: activeType == item.VALUE ? "#DB2522" : "#555555",
                      fontWeight: activeType == item.VALUE ? "bold" : "600",
                    }}
                  >
                    {item.TEXT} ({this.getCountByReqId(item.VALUE)})
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
          />
        </View>
        <FlatList
          data={_request}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => this.getRequestList()}
              tintColor={"#444"}
              title={"Tải lại dữ liệu"}
              titleColor={"#000"}
            />
          }
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={
            this.state.loading ? null : (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "10%",
                }}
              >
                <Image
                  source={require("../../assets/images/blank_requirement.png")}
                  style={{ width: 100, height: 100 }}
                />
                <Text style={styles.noNotification}>
                  Không có yêu cầu, phản ánh nào.
                </Text>
                <Text
                  style={{
                    color: "#A1A1A1",
                    textAlign: "center",
                    fontSize: 14,
                  }}
                >
                  Chúng tôi luôn cố gắng nỗ lực để làm hài lòng mọi quý khách
                </Text>
              </View>
            )
          }
        />
        <TouchableOpacity
          style={styles.add}
          onPress={() =>
            navigation.navigate("CreateRequirement", {
              requestTypeList,
            })
          }
        >
          <Icon name={"plus"} size={25} color={"#fff"} />
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  left: { marginLeft: 16 },
  btnBack: { paddingHorizontal: 16, paddingVertical: 8 },
  fs16: { fontSize: 16, fontWeight: "bold" },
  status: {
    backgroundColor: "#FBE9EC",
    padding: 8,
    paddingHorizontal: 15,
    borderRadius: 30,
  },
  item: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    marginBottom: 16,
    marginHorizontal: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  itemBot: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FAEDDF",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  add: {
    backgroundColor: colors.main,
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  noNotification: {
    color: "#444",
    fontWeight: "bold",
    marginVertical: 16,
    fontSize: 16,
  },
});

const mstp = (state) => ({
  request: state.RequestReducer.request,
  refresh: state.RequestReducer.refresh,
  codes: state.AppReducer.codes,
});
const mdtp = (dispatch) => ({
  onGetRequest: (data) => dispatch(actions.getRequest(data)),
});

export default connect(
  mstp,
  mdtp
)(Requirement);
