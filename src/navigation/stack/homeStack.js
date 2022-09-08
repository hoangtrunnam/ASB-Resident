import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Home from '../../views/home/Home';
import ListCard from '../../views/home/card/ListCard';
import InforCard from '../../views/home/card/InforCard';
import Apartment from '../../views/home/apartment';
import ApartmentInfo from '../../views/home/apartment/apartmentInfo';
import CustomerInfo from '../../views/profile/CustomerInfo';
import ContactManagement from '../../views/home/ContactManagement';
import DetailNotification from '../../views/notification/DetailNotification';
import Notification from '../../views/notification/Notification';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Requirement from '../../views/requirement';
import DetailRequirement from '../../views/requirement/DetailRequirement';
import Payment from '../../views/payment';
import PaymentInfo from '../../views/payment/paymentInfo';
import Debt from '../../views/debt/Debt';
import DebtInfo from '../../views/debt/DebtInfo';
import HandBook from '../../views/home/handbook';
import HandbookDetail from '../../views/home/handbook/handbookDetail';
import Exchange from '../../views/home/exchange';

import {defaultOptions} from '../helpers';
import ChooseProject from "../../views/authentication/screen/ChooseProject";
const HomeStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      // headerBackTitle: null
    },
  },
  CarCard: {
    screen: ListCard,
  },
  InformationCard: {
    screen: InforCard,
  },
  Apartment: {
    screen: Apartment,
    navigationOptions: ({navigation}) =>
      defaultOptions({navigation, title: 'Căn hộ của bạn'}),
  },
  ApartmentInfo: {
    screen: ApartmentInfo,
  },
  _CustomerInfo: {
    screen: CustomerInfo,
  },
  ContactManagement: {
    screen: ContactManagement,
    navigationOptions: ({navigation}) =>
      defaultOptions({navigation, title: 'Danh bạ KĐT'}),
  },
  NewsMore: {
    screen: Notification,
    navigationOptions: ({navigation}) =>
      defaultOptions({title: 'Thông báo', navigation: navigation}),
  },
  DetailNotification: {
    screen: DetailNotification,
    navigationOptions: ({navigation}) =>
      defaultOptions({title: 'Chi tiết thông báo', navigation: navigation}),
  },
  Requirement: {
    screen: Requirement,
  },
  DetailRequirement: {
    screen: DetailRequirement,
  },
  Payment: {
    screen: Payment,
    navigationOptions: ({navigation}) =>
      defaultOptions({navigation, title: 'Hoá đơn'}),
  },
  PaymentInfo: {
    screen: PaymentInfo,
    navigationOptions: ({navigation}) =>
      defaultOptions({navigation, title: 'Chi tiết giao dịch'}),
  },
  Debt: {
    screen: Debt,
    navigationOptions: ({navigation}) =>
      defaultOptions({navigation, title: 'Công nợ'}),
  },
  debtInfo: {
    screen: DebtInfo,
    navigationOptions: ({navigation}) =>
      defaultOptions({navigation, title: 'Thanh toán'}),
  },
  HandBook: {
    screen: HandBook,
    navigationOptions: ({navigation}) =>
      defaultOptions({navigation, title: 'Sổ tay cư dân'}),
  },
  HandBookDetail: {
    screen: HandbookDetail,
    navigationOptions: ({navigation}) =>
      defaultOptions({navigation, title: 'Chi tiết'}),
  },
  Exchange: {
    screen: Exchange,
    navigationOptions: ({navigation}) =>
      defaultOptions({navigation, title: 'Trao đổi'}),
  },
});
HomeStack.navigationOptions = ({navigation}) => {
  let {routeName} = navigation.state.routes[navigation.state.index];
  let navigationOptions = {};
  if (navigation.state.index > 0) {
    navigationOptions.tabBarVisible = false;
  }
  return navigationOptions;
};
export default HomeStack;
