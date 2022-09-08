/* eslint-disable no-alert */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Linking,
  RefreshControl,
  Dimensions,
  ImageBackground,
  StatusBar,
} from 'react-native';

import {Header} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {actions} from './action';
import Swiper from 'react-native-swiper';
import ActionButton from 'react-native-action-button';
import {actions as actionsRequest} from '../requirement/action';
import {actions as actionApp} from '../../redux/action';
import LoadingPlaceholder from '../../components/LoadingPlaceholder';
import {executeSearch, pageSize, translateError} from '../../core/services';
import {isError, getSessionInfo, formatDate} from '../../core/utils';
import {ModuleInfos} from '../../core/moduleList';
import Animated from 'react-native-reanimated';
import styles from './styles';
import {httpService} from '../../services/httpService';
import {CONST} from '../../constant/const';
import {apiUrl} from '../../core/constanst';
import AsyncStorage from '@react-native-community/async-storage';
import {navigate} from '../../navigation/navigateService';
import {colors} from '../../config/colors';
import {SafeAreaView} from 'react-navigation';

const {width} = Dimensions.get('window');

const menu = [
  {
    name: 'Thông báo',
    icon: require('@assets/images/notifications.png'),
    screen: 'Notification',
  },
  {
    name: 'Hoá đơn',
    icon: require('@assets/images/hoa-don.png'),
    screen: 'Payment',
  },
  {
    name: 'Công nợ',
    icon: require('@assets/images/cong-no.png'),
    screen: 'Debt',
  },
  {
    name: 'Căn hộ',
    icon: require('@assets/images/Hospital.png'),
    screen: 'Apartment',
  },
  {
    name: 'Trao đổi',
    icon: require('@assets/images/chat.png'),
    screen: 'Exchange',
  },
  {
    name: 'Sổ tay cư dân',
    icon: require('@assets/images/sotaycudan.png'),
    screen: 'HandBook',
  },
];

const Menu = ({navigation}) => {
  return (
    <FlatList
      data={menu}
      renderItem={({item, index}) => (
        <TouchableOpacity
          style={styles.itemMenu}
          key={index}
          onPress={() => navigation.navigate(item.screen)}>
          <Image
            source={item.icon}
            style={{width: 30, height: 30}}
            resizeMode={'contain'}
          />
          <Text style={{paddingVertical: 8, color: '#323232', fontSize: 13}}>
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => index.toString()}
      numColumns={3}
      scrollEnabled={false}
    />
  );
};

const Category = ({newsCate, navigation}) => {
  return (
    <FlatList
      data={newsCate}
      renderItem={({item, index}) => (
        <TouchableOpacity
          style={[styles.cardMenu, styles.itemCategory, {marginRight: 8}]}
          key={index}
          onPress={() =>
            navigation.navigate('DetailNotification', {
              notification: item,
              getNotification: () => {},
            })
          }>
          <Image
            source={{uri: `${apiUrl}${item.FILE_PATH}`}} //
            defaultSource={require('../../assets/temp/default.jpg')}
            style={styles.imageCategory}
            resizeMode="cover"
          />
          <View style={{padding: 16, height: 120}}>
            <Text numberOfLines={2} style={styles.titleCategory}>
              {item.TITLE}
            </Text>
            <Text style={{color: '#a1a1a1', marginTop: 6}}>
              {formatDate(item.CREATED_DATE)}
            </Text>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => index.toString()}
      horizontal={true}
      ListEmptyComponent={<LoadingPlaceholder number={4} />}
    />
  );
};
const News = ({news, navigation}) => {
  return (
    <FlatList
      data={news}
      contentContainerStyle={[styles.cardMenu, {paddingVertical: 6}]}
      renderItem={({item, index}) => (
        <TouchableOpacity
          style={[
            styles.itemNews,
            news.length - 1 === index && {borderBottomWidth: 0},
          ]}
          key={index}
          onPress={() =>
            navigation.navigate('DetailNotification', {
              notification: item,
              getNotification: () => {},
            })
          }>
          <View style={{padding: 8}}>
            <Text style={styles.titleCategory}>{item.TITLE}</Text>
            <Text style={{color: '#888'}}>{formatDate(item.CREATED_DATE)}</Text>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => index.toString()}
      ListEmptyComponent={<LoadingPlaceholder number={2} />}
    />
  );
};

class Home extends React.Component {
  static navigationOptions = ({navigation}) => {
    // let session = navigation.state.params.session;
    return {
      headerTransparent: true,
      headerShown: false,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      DEPARTMENT: '',
    };
  }

  async componentDidMount() {
    const DEPARTMENT_NAME = await AsyncStorage.getItem(CONST.DEPARTMENT_NAME);
    this.setState({DEPARTMENT: DEPARTMENT_NAME});
    this.loadData();
  }

  async addFCMToken(session) {
    let {Username} = session;
    let fcmToken = await this.getToken();
    try {
      await httpService.postWithoutToken('api/notification/addtoken', {
        UserName: Username,
        OldToken: fcmToken,
        NewToken: fcmToken,
        AppKey: 'EzBuilding',
      });
    } catch (error) {
      console.warn('addFCMToken -> error', error);
    }
  }

  loadData() {
    const {onRefresingDone} = this.props;
    this.getContact().finally(() => {});
    this.getListCategoriesNotify().finally(() => {
      onRefresingDone();
    });
  }

  async getContact() {
    const searchResult = await executeSearch({
      moduleInfo: {ModuleID: '03513', SubModule: 'MMN'},
      values: [],
      // conditions: [{ ConditionID: "D05", Operator: "003", Value: 1, ID: 1 }],
      conditions: [],
      data: {
        pageSize: pageSize,
      },
    });
    this.props.onGetContact(searchResult?.result.data);
  }

  async getListCategoriesNotify() {
    try {
      const searchResult = await this.searchByCate({
        options: {
          values: [],
          conditions: [],
          data: {pageSize: 100},
          moduleInfo: {
            ModuleID: '03505',
            SubModule: 'MMN',
          },
        },
      });
      console.info('searchResult', searchResult.data);
      const options = {
        2: {ID: 2, ModuleID: '03501', Value: 1, conditions: []},
        3: {ID: 3, ModuleID: '03512', Value: 1},
        1: {ID: 1, ModuleID: '03502', Value: 1},
        5: {ID: 1, ModuleID: '03502', Value: 5},
        6: {ID: 1, ModuleID: '03502', Value: 6},
      };
      let promisses = (searchResult?.data || []).reduce((arrs, cVal) => {
        if (cVal.SHOW_HOME === '1' || cVal.SHOW_HOME === 'Y') {
          arrs.push(this.searchByCate(options[cVal.ID]));
        }
        return arrs;
      }, []);
      const values = await Promise.all(promisses);
      values.forEach(val => {
        switch (val.ID) {
          case 1:
            switch (val.Value) {
              case 1:
                this.props.onGetNewsCate(val.data || []);
                break;
              case 5:
                this.props.onGetBanners(val.data || []);
                break;
              case 6:
                this.props.onGetNews(val.data || []);
                break;
            }
            break;
          case 2:
            // this.props.onGetNews(val.data || []);
            break;
          case 3:
            // this.props.onGetNews(val.data || []);
            break;
        }
      });
    } catch (e) {
      // alert(e.message);
      this.getListCategoriesNotify();
    }
  }
  async searchByCate({ID, ModuleID, Value, options, conditions}) {
    const searchResult = await executeSearch(
      options || {
        moduleInfo: {ModuleID, SubModule: 'MMN'},
        values: [],
        conditions: conditions || [
          {ConditionID: 'D05', Operator: '003', Value, ID},
        ],
        data: {
          pageSize: 10,
        },
      },
    );
    // if (isError(searchResult)) {
    //   throw searchResult;
    // }
    console.info(
      'searchByCate',
      'header: ',
      options || {
        moduleInfo: {ModuleID, SubModule: 'MMN'},
        values: [],
        conditions: [{ConditionID: 'D05', Operator: '003', Value, ID}],
        data: {
          pageSize: 10,
        },
      },
      'response',
      {data: searchResult.result.data, ID, Value},
    );
    return {data: searchResult.result.data, ID, Value};
  }

  render() {
    const {navigation, banners, contacts, codes, refreshing, news, newsCate} =
      this.props;
    const {onRefresing} = this.props;
    const receptions = contacts
      ? contacts.filter(e => e.IS_DEFAULT === 'Y')
      : [];
    const managements = contacts
      ? contacts.filter(e => e.IS_DEFAULT !== 'Y')
      : [];

    const {Extrapolate, interpolate, Value, event} = Animated;
    const marginTop = interpolate(this.state.scrollY, {
      inputRange: [0, 30],
      outputRange: [60, 40],
      extrapolate: 'clamp',
    });
    let IMAGE_HEIGHT = (width * 226) / 375;
    const height = interpolate(this.state.scrollY, {
      inputRange: [-300, 0, 300],
      outputRange: [IMAGE_HEIGHT + 300, IMAGE_HEIGHT, IMAGE_HEIGHT - 300],
      extrapolate: 'clamp',
    });
    const session = navigation.state?.params?.session || {};

    return (
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} />
        <SafeAreaView style={{backgroundColor: colors.main}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 20,
            }}>
            <TouchableOpacity
              style={styles.apartment}
              onPress={() => navigate('ChooseProject')}>
              <Text style={{fontSize: 16, color: '#fff'}}>Xin chào, </Text>
              <Text style={{color: '#fff', marginRight: 4}}>
                {this.state.DEPARTMENT}
              </Text>
              <Icon name={'chevron-down'} color={'#fff'} size={16} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <ScrollView
          style={[styles.flex, styles.mgHeader]}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                onRefresing();
                this.loadData();
              }}
              tintColor={'#fff'}
            />
          }
          scrollEventThrottle={1}>
          <View style={styles.contentWrapper}>
            <View style={{}}>
              <View
                style={[styles.cardMenu, {paddingVertical: 6, marginTop: 20}]}>
                <Menu navigation={navigation} />
              </View>
            </View>
          </View>
          <View style={{paddingVertical: 12, backgroundColor: '#fff'}}>
            {banners ? (
              <Swiper
                loadMinimal
                loadMinimalSize={1}
                style={{height: 150}}
                loop={true}
                showsPagination={false}>
                {banners.map((e, index) => (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.8}
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                      source={{uri: `${apiUrl}${e.FILE_PATH}`}} //
                      defaultSource={require('../../assets/temp/default.jpg')}
                      style={styles.imageBanner}
                      resizeMode={'cover'}
                    />
                  </TouchableOpacity>
                ))}
              </Swiper>
            ) : null}
          </View>
          <View style={{backgroundColor: '#fff'}}>
            {newsCate.length ? (
              <View style={[{backgroundColor: '#fff'}]}>
                <View style={[styles.row]}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#323232',
                    }}>
                    Bảng tin cư dân
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('NewsMore', {
                        CategoryId: 5,
                      });
                    }}>
                    <Text style={{color: colors.main, fontWeight: 'bold'}}>
                      Xem thêm <Icon name={'chevron-right'} color={'#59B182'} />
                    </Text>
                  </TouchableOpacity>
                </View>
                <News navigation={navigation} news={newsCate} />
              </View>
            ) : null}
            {news.length ? (
              <>
                <View style={styles.row}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#323232',
                    }}>
                    Tin tức
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('NewsMore', {
                        CategoryId: 1,
                      });
                    }}>
                    <Text style={{color: colors.main, fontWeight: 'bold'}}>
                      Xem thêm <Icon name={'chevron-right'} color={'#59B182'} />
                    </Text>
                  </TouchableOpacity>
                </View>
                <Category navigation={navigation} newsCate={news} />
              </>
            ) : null}
          </View>
        </ScrollView>

        <ActionButton
          buttonColor={colors.main}
          renderIcon={() => <Icon name={'phone'} color={'#fff'} size={20} />}
          // bgColor="rgba(0, 0, 0, 0.1);"
        >
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="Danh bạ KĐT"
            onPress={() =>
              navigation.navigate('ContactManagement', {managements})
            }>
            <Icon name="address-book" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#3498db"
            title="Lễ tân"
            onPress={() => {
              Linking.openURL(`tel:${receptions[0]?.CONTACT_PHONE}`);
            }}>
            <Icon name="concierge-bell" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}

const mstp = state => ({
  banners: state.HomeReducer.banners,
  contacts: state.HomeReducer.contacts,
  refreshing: state.HomeReducer.refreshing,
  news: state.HomeReducer.news,
  newsCate: state.HomeReducer.newsCate,
  codes: state.AppReducer.codes,
  request: state.RequestReducer.request,
});
const mdtp = dispatch => ({
  onRefresing: () => dispatch(actions.onRefresing()),
  onRefresingDone: () => dispatch(actions.onRefresingDone()),
  onGetBanners: data => dispatch(actions.getBanners(data)),
  onGetContact: data => dispatch(actions.getContact(data)),
  onGetCode: () => dispatch(actionApp.getCacheCode()),
  onGetRequest: data => dispatch(actionsRequest.getRequest(data)),
  onGetNews: payload => dispatch(actions.getNews(payload)),
  onGetNewsCate: payload => dispatch(actions.getNewsCate(payload)),
});

export default connect(mstp, mdtp)(Home);
