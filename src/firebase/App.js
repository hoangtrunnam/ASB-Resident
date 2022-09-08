/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Clipboard,
  Platform,
  ScrollView,
} from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
// import firebase from "react-native-firebase";
// import type { RemoteMessage } from "react-native-firebase";
import AsyncStorage from "@react-native-community/async-storage";

import firebaseClient from "./FirebaseClient";
import { registerKilledListener, registerAppListener } from "./Listeners";

// registerKilledListener();

class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: "",
      tokenCopyFeedback: "",
    };
  }

  async componentDidMount() {}

  componentWillUnmount() {}

  render() {
    let { token, tokenCopyFeedback } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView style={{ paddingHorizontal: 20 }}>
          <Text style={styles.welcome}>Welcome to Simple Fcm Client!</Text>

          <Text style={styles.feedback}>{this.state.tokenCopyFeedback}</Text>

          <Text style={styles.feedback}>
            Remote notif won't be available to iOS emulators
          </Text>
          <TouchableOpacity
            onPress={null}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Send Remote Notification</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => this.sendRemoteData(token)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Send Remote Data</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Detail", { id: 30 })}
          >
            <Text>Go to detail</Text>
          </TouchableOpacity>
          <Text style={styles.instructions}>Init notif:</Text>
          <Text>{JSON.stringify(this.state.initNotif)}</Text>
          <Text style={styles.instructions}>Token:</Text>
          <Text
            selectable={true}
            onPress={() => this.setClipboardContent(this.state.token)}
          >
            {this.state.token}
          </Text>
        </ScrollView>
      </View>
    );
  }
  setClipboardContent(text) {
    Clipboard.setString(text);
    this.setState({ tokenCopyFeedback: "Token copied to clipboard." });
    setTimeout(() => {
      this.clearTokenCopyFeedback();
    }, 2000);
  }
  clearTokenCopyFeedback() {
    this.setState({ tokenCopyFeedback: "" });
  }
}
class DetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
    };
  }
  componentDidMount() {
    const id = this.props.navigation.state.params?.id;
    this.setState({ id });
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Detail page {this.state.id}</Text>
      </View>
    );
  }
}
const _AppFirebase = createStackNavigator({
  Main: {
    screen: MainPage,
  },
  Detail: {
    screen: DetailPage,
  },
});
export default createAppContainer(_AppFirebase);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 2,
  },
  feedback: {
    textAlign: "center",
    color: "#996633",
    marginBottom: 3,
  },
  button: {
    backgroundColor: "teal",
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    backgroundColor: "transparent",
  },
});
