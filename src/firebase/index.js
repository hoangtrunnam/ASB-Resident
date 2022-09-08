import React, { Component } from "react";
import { View, Text, Alert } from "react-native";
// import firebase from "react-native-firebase";
// import type { RemoteMessage } from "react-native-firebase";
import AsyncStorage from "@react-native-community/async-storage";
class FireBaseClient extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <View>
        <Text> Hello Hello Firebase </Text>
      </View>
    );
  }
}

export default FireBaseClient;
