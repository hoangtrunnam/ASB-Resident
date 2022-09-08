import React, { useEffect, useState } from "react";
import { Text, View, Image, ScrollView } from "react-native";
import { WebView } from "react-native-webview";

const HandBookDetail = ({ navigation, route }) => {
  const { item } = navigation.state.params;
  const [data, setData] = useState(null);
  const html = `
  <html lang="en">
  <head>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
      <div id="test-app">
      <h3>${item?.TITLE}</h3>
      ${item?.CONTENT}
      </div>
      <style>
      body {display: flex; justify-content: center; align-items: center;font-family:Helvetica Neue !important;}
      p {font-family:Helvetica Neue !important}
      </style>
      
  </body>
  </html>`;
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ html }}
        style={{ flex: 1 }}
        mixedContentMode="always"
      />
    </View>
  );
};
HandBookDetail.navigationOptions = () => ({
  title: '',
});

export default HandBookDetail;
