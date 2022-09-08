import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView, Alert,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Ultils } from "../../config/Ultils";
import { actions } from "./action";
import { connect } from "react-redux";
import { CONST } from "../../constant/const";
import { getSessionKey, getSessionInfo } from "../../core/utils";
import { Session } from "../../core/entities";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../config/colors";
import { httpService } from "../../services/httpService";
import { API } from "../../services/APIs";
import { StoreKey } from "../../core/constanst";
const Star = ({ onRate, value, is_rated }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
      {stars.map((e, i) => (
        <Icon
          key={i}
          name={"star"}
          color={value && value >= e ? "#FFB200" : "#DDE4EC"}
          size={40}
          solid
          onPress={() => {
            if (!is_rated) {
              onRate(e);
            }
          }}
        />
      ))}
    </View>
  );
};

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Rating: null,
      session: {},
    };
    this.onRate = this.onRate.bind(this);
    this.submitRating = this.submitRating.bind(this);
  }

  async componentDidMount() {
    const payload = await AsyncStorage.removeItem(CONST.RATING_APP);
    if (payload) {
      this.props.checkIsRatingApp(true);
    } else {
      this.props.checkIsRatingApp(false);
    }
    const rate_number = await AsyncStorage.getItem(CONST.RATE_NUMBER);
    if (rate_number) {
      this.setState({ Rating: rate_number });
    }
    let session = await getSessionInfo();
    console.log("session", session);
    this.setState({ session });
  }

  onRate(Rating) {
    this.setState({ Rating }, () => {
      AsyncStorage.setItem(CONST.RATE_NUMBER, JSON.stringify(Rating));
      this.submitRating();
    });
  }

  submitRating() {
    const data = {
      modId: "R02112",
      submod: "MAD",
      moduleData: {
        UserName: Ultils.username(),
        Rating: this.state.Rating,
      },
    };
    this.props.onRating(data);
  }

  handleLogout = async () => {
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    const OldToken = await AsyncStorage.getItem(StoreKey.FCM_TOKEN_OLD);
    const Session = JSON.parse(await AsyncStorage.getItem(StoreKey.Session));
    const NewToken = await AsyncStorage.getItem(StoreKey.FCM_TOKEN_CURRENT);

    await httpService.postWithoutToken(
      API.REMOVE_FCM_TOKEN,
      {
        AppKey: 'SmartBuilding',
        Username: Session.Username,
        OldToken: OldToken || '',
        NewToken: NewToken || fcmToken,
      },
    )
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  }

  logout() {
    Alert.alert(
      'Thông báo',
      'Bạn có muốn đăng xuất',
      [
        {text: 'Có', onPress: () => {
            this.handleLogout();
          }
        },
        {
          text: 'Không'
        }
      ]
    )
  }

  render() {
    const { Rating, session } = this.state;
    
    const { is_rated, navigation } = this.props;
  
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={[styles.row, { backgroundColor: "#fff" }]}>
            <View style={{}}>
              <Text style={styles.username}>
                {session.DisplayName || session.Username}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("CustomerInfo", {
                    isInfo: true,
                    customer: {
                      CUSTOMER_NAME: session.DisplayName || session.Username,
                      BIRTH_DATE: session.BIRTH_DATE,
                      PHONE_NUMBER: session?.Username || ''
                    },
                  })
                }
              >
                <Text style={{ color: "#666666", fontSize: 16 }}>
                  Chạm để xem thông tin
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("ChangePassword")}
          >
            <Icon name={"unlock-alt"} size={16} color={"#0ACD9C"} />
            <Text style={{ marginLeft: 20, color: "#666", fontSize: 16 }}>
              Đổi mật khẩu
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logout} onPress={() => this.logout()}>
            <Text
              style={{ color: colors.main, fontWeight: "bold", fontSize: 16 }}
            >
              Đăng xuất
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleHeader: {
    marginLeft: 16,
    fontSize: 18,
    fontWeight: "bold",
    color: "#323232",
  },
  container: { flex: 1, backgroundColor: "#eee" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  username: {
    color: "#444",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    padding: 16,
    backgroundColor: "#fff",
  },
  logout: {
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    marginTop: 16,
  },
  rate: {
    margin: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rating: {
    backgroundColor: "#FFE6D7",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  star: {
    backgroundColor: "#fff",
    padding: 16,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    justifyContent: "center",
    width: "100%",
  },
});
const mstp = (state) => ({
  is_rated: state.ProfileReducer.is_rated,
});
const mdtp = (dispatch) => ({
  onRating: (data) => dispatch(actions.ratingApp(data)),
  checkIsRatingApp: (payload) => dispatch(actions.checkIsRatingApp(payload)),
});
export default connect(
  mstp,
  mdtp
)(Profile);
