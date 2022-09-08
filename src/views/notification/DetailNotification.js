import React, {useEffect, useState} from 'react';
import {Text, View, Image, ScrollView} from 'react-native';
import styles from './styles';
import {executeSearch, executeLoadHandler} from '../../core/services';
import {searchModule} from '../../core/modules/search';
import {WebView} from 'react-native-webview';
import {Ultils} from '../../config/Ultils';

const DetailNotification = ({navigation, route}) => {
  const {notification, getNotification, item, id} = navigation.state.params;
  const [data, setData] = useState(null);
  const onGetDetail = async () => {
    let kq = await executeLoadHandler(
      {
        ModuleID: '02502',
        SubModule: 'MVW',
      },
      [
        {
          FieldID: 'L01',
          FieldType: 'DEC',
          Value: notification?.ID || id,
        },
      ],
    );
    if (kq.status === 'Ok') {
      setData(kq.result[0]);
    }
  };
  useEffect(() => {
    onGetDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const html = `
  <html lang="en">
  <head>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
      <div id="test-app">
      <h3 class="title"> ${data?.TITLE || ''}</h3>
      ${data?.CONTENT || ''}
      </div>
      
  </body>
  </html>`;
  return (
    <View style={styles.container}>
      <WebView
        source={{html}}
        style={{
          flex: 1,
        }}
        injectedJavaScript={
          "const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); "
        }
        scalesPageToFit={false}
        // mixedContentMode="always"
        // scalesPageToFit={true}
      />
    </View>
  );
};

export default DetailNotification;
