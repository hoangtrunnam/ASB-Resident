import React from "react";
import { View, Text, Platform } from "react-native";
import { Ultils } from "../../config/Ultils";
import { httpService } from "../../services/httpService";
import { API } from "../../services/APIs";
import { WebView } from "react-native-webview";
import { ScrollView } from "react-navigation";

class DetailNotification extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    /*  headerStyle: {
      backgroundColor: "#C3333C"
    },
    tabBarVisible: false, */
  });
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    const {
      notification,
      getNotification,
      item,
    } = this.props.navigation.state.params;
    this.props.navigation.setParams({ getNotification });

    if (notification) {
      this.onGetDetail(notification);
    } else {
      this.setState({ data: item });
    }
  }
  async onGetDetail(notification) {
    const UserName = await Ultils.username();
    console.warn("onGetDetail -> UserName", UserName);

    const data = {
      modId: "R02106",
      submod: "MED",
      moduleData: {
        // UserName,
        Id: notification.ID,
      },
    };
    console.log("onGetDetail -> data", data);
    const response = await httpService.post(API.GET_DETAIL_NOTIFICATION, data);
    this.setState({ data: response.data });
  }

  render() {
    const { navigation } = this.props;
    const { item } = navigation.state.params;
    if (item)
      return (
        <ScrollView style={{ flex: 1, padding: 16 }}>
          <Text>{item.Content}</Text>
        </ScrollView>
      );
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <WebView
            // onLoadStart={this.onLoadStart}
            scrollEnabled={true}
            javaScriptEnabled={true}
            source={{ baseUrl: "", html: this.state.data?.Content }}
            style={{ marginTop: 0 }}
            scalesPageToFit={Platform.OS !== "ios"}
            originWhitelist={["*"]}
            injectedJavaScript={`
                        function myFunction() {
                          var tag = document.getElementsByTagName("img");
                          for(let i=0; i < tag.length; i++){
                           tag[i].setAttribute("style", "width: ${
                             Ultils.dimensions.width - 16
                           }px");
                          }
                        }
                        myFunction();
                        `}
          />
        </View>
      </View>
    );
  }
}

export default DetailNotification;
