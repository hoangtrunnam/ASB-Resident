import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import AuthStack from '../stack/authStack';
// import MainApp from "../drawer";
import MainApp from '../tab';
import {Ultils} from '../../config/Ultils';
import {CONST} from '../../constant/const';
import {updateCache, refreshSession} from '../../core/services';
import {Session} from '../../core/entities';
import {StoreKey} from '../../core/constanst';
import {
  registerKilledListener,
  registerAppListener,
} from '../../firebase/Listeners';
import messaging from '@react-native-firebase/messaging';
import ChooseProject from "../../views/authentication/screen/ChooseProject";

registerKilledListener;

class AuthLoading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loadingText: '',
    };
  }

  async componentDidMount() {
    registerAppListener(this.props.navigation);
    this.requestUserPermission();
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });
    messaging().onMessage(async remoteMessage => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    messaging().onTokenRefresh(async token => {
      const FCM_TOKEN_OLD = await AsyncStorage.getItem('fcmToken');
      await AsyncStorage.setItem(StoreKey.FCM_TOKEN_OLD, FCM_TOKEN_OLD);
      await AsyncStorage.setItem(StoreKey.FCM_TOKEN_CURRENT, token);
    });

    await this._bootstrapAsync();
  }

  async requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      messaging()
        .getToken()
        .then(fcmToken => {
          console.log({fcmToken});
          AsyncStorage.setItem('fcmToken', fcmToken);
        })
        .catch(error => {
          console.log('[FCMService] getToken rejected ', error);
        });
    }
  }

  _bootstrapAsync = async () => {
    this.setState({loading: true, loadingText: 'Kiểm tra cập nhật...'});
    try {
      await updateCache();
    } catch (ex) {
      this.setState({loading: false});
    }
    this.setState({loadingText: 'Kiểm tra xác thực...'});
    let session: Session = await AsyncStorage.getItem(StoreKey.Session);
    if (!session) {
      this.setState({loading: false});
      this.props.navigation.navigate('Auth');
    } else {
      this.setState({loadingText: 'Kiểm tra phiên đăng nhập...'});
      const ses = await refreshSession();
      this.setState({loading: false});
      if (!ses || ses.SessionStatus !== 'A') {
        this.props.navigation.navigate('Auth');
      } else {
        this.setState({loading: false});
        // await AsyncStorage.setItem(StoreKey.Session, JSON.stringify(ses));
        this.props.navigation.navigate('MainApp');
      }
    }
  };

  render() {
    return (
      <View flex={1}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1
          }}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={{
              width: Ultils.dimensions.width / 4,
              height: Ultils.dimensions.width / 4,
              marginVertical: 20
            }}
            resizeMode={'contain'}
          />
          <ActivityIndicator animating={this.state.loading} color="red" />
          <Text style={{color: 'red'}}>{this.state.loadingText}</Text>
        </View>
      </View>
    );
  }
}

export default createAppContainer(
  createSwitchNavigator({
    AuthLoading: {
      screen: AuthLoading,
    },
    Auth: {
      screen: AuthStack,
    },
    MainApp: {
      screen: MainApp,
    },
    ChooseProject: {
      screen: ChooseProject
    },
  }),
);

const styles = StyleSheet.create({
  img: {
    width: Ultils.dimensions.width,
    height: Ultils.dimensions.height / 2.5,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  },
});
