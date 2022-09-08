import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import {Ultils} from '../../config/Ultils';
import {connect} from 'react-redux';
import {actions} from './action';
import {searchModule} from '../../core/modules/search';
import {ModuleInfos} from '../../core/moduleList';
import {isError} from '../../core/utils';
import {colors} from '../../config/colors';

class Notification extends React.Component {
  static navigationOptions = () => ({
    title: '',
  });
  constructor(props) {
    super(props);
    const CategoryId = this.props.navigation.getParam('CategoryId');
    this.state = {
      notificationType: [{CATE_NAME: 'Tất cả', ID: ''}],
      activeTypeIndex: CategoryId || '',
      activeTypeValue: CategoryId || '',
      loading: true,
    };
    this.getNotification = this.getNotification.bind(this);
  }

  componentDidMount() {
    this.getNotification();
    this.getTypeNotification();
  }

  async getNotification() {
    searchModule.executeSearch(ModuleInfos.getNotification).then(res => {
      if (isError(res)) {
        alert(res.message);
        return;
      }
      this.setState({loading: false});
      this.props.onGetNotification(res.result.data);
    });
  }

  // a = {
  //   moduleInfo: {ModuleID: '03502', SubModule: 'MMN'},
  //   values: [],
  //   conditions: [
  //     {ConditionID: 'D05', Operator: '003', Value: 5, ID: 1},
  //   ],
  //   data: {
  //     pageSize: 10,
  //   },
  // }

  getTypeNotification() {
    searchModule.executeSearch(ModuleInfos.getNewsCategory).then(res => {
      if (isError(res)) {
        alert(res.message);
        return;
      }
      const {notificationType} = this.state;
      this.setState({
        notificationType: notificationType.concat(res.result.data),
      });
    });
  }

  selectTypeNotification(item, index) {
    if (item) {
      searchModule
        .executeSearch(ModuleInfos.getNotification, [], 20, [
          {ConditionID: 'D05', Operator: '003', Value: item, ID: 1},
        ])
        .then(res => {
          if (isError(res)) {
            alert(res.message);
          }
          this.props.onGetNotification(res.result.data);
          this.refHeader.scrollToIndex({index, viewOffset: 50});
          requestAnimationFrame(() => {
            this.setState({
              activeTypeIndex: item,
              activeTypeValue: item,
            });
          });
        });
    } else {
      this.getNotification();
      this.refHeader.scrollToIndex({index, viewOffset: 50});
      requestAnimationFrame(() => {
        this.setState({
          activeTypeIndex: item,
          activeTypeValue: item,
        });
      });
    }
  }

  getCountByReqId(activeType) {
    const {notifications} = this.props;
    const _notifications = activeType
      ? notifications?.filter(e => e.CATE_ID === activeType)
      : notifications;
    return _notifications?.length || 0;
  }

  render() {
    const {navigation, notifications, refreshing} = this.props;
    const {notificationType, activeTypeValue, activeTypeIndex} = this.state;
    const _notifications = activeTypeValue
      ? notifications?.filter(e => e.TYPE === activeTypeValue)
      : notifications;
    return (
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <View style={{paddingVertical: 16}}>
            <FlatList
              ref={ref => (this.refHeader = ref)}
              data={notificationType}
              renderItem={({item, index}) => (
                <View style={{marginLeft: 16}}>
                  <TouchableOpacity
                    style={
                      item.ID === activeTypeIndex
                        ? styles.statusActive
                        : styles.status
                    }
                    onPress={this.selectTypeNotification.bind(
                      this,
                      item.ID,
                      index,
                    )}
                    activeOpacity={0.8}>
                    <Text
                      style={{
                        color:
                          item.ID === activeTypeIndex ? '#DB2522' : '#555555',
                        fontWeight: index === activeTypeIndex ? 'bold' : '600',
                      }}>
                      {item.CATE_NAME} {/*({this.getCountByReqId(item.ID)})*/}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              horizontal={true}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <FlatList
            data={_notifications}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => this.getNotification()}
                tintColor={'#323232'}
              />
            }
            renderItem={({item}) => (
              <TouchableOpacity
                style={[
                  item.IS_READ === 'Y'
                    ? styles.itemNotificationRead
                    : styles.itemNotification,
                ]}
                onPress={() =>
                  navigation.navigate('DetailNotification', {
                    notification: item,
                    getNotification: this.getNotification,
                  })
                }>
                <Image
                  source={require('../../assets/images/logo.png')}
                  style={{width: 36, height: 36}}
                />
                <View style={{flex: 1, marginLeft: 16}}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 16,
                      color: '#2B2B2B',
                    }}>
                    {item.TITLE}
                  </Text>
                  <Text
                    style={{paddingVertical: 4, color: '#888888'}}
                    numberOfLines={2}>
                    {item.DESCRIPTION}
                  </Text>
                  <Text style={{color: '#A1A1A1', fontSize: 14}}>
                    {Ultils.convertTime(item.CREATED_DATE)}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{flexGrow: 1}}
            ListEmptyComponent={
              this.state.loading ? null : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 30,
                  }}>
                  <Image
                    source={require('../../assets/images/bell_notification.png')}
                    style={{
                      width: Ultils.dimensions.width / 5,
                      height: Ultils.dimensions.width / 5,
                      marginBottom: 20,
                    }}
                    resizeMode={'contain'}
                  />
                  <Text
                    style={{
                      marginVertical: 8,
                      color: '#444444',
                      fontSize: 18,
                    }}>
                    Chưa có thông báo
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#A1A1A1',
                      fontSize: 16,
                    }}>
                    Thông tin mới nhất sẽ được cập nhật thường xuyên từ BQL!
                  </Text>
                </View>
              )
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1},
  row: {flexDirection: 'row', alignItems: 'center', marginHorizontal: 16},
  tabActive: {
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: colors.main,
    alignItems: 'center',
    paddingVertical: 16,
  },
  tabInactive: {
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
    alignItems: 'center',
    paddingVertical: 16,
  },
  labelActive: {fontSize: 16, fontWeight: '500'},
  labelInactive: {fontSize: 16, color: '#A1A1A1'},
  itemNotification: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    marginVertical: 1,
  },
  itemNotificationRead: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#F8F8F8',
  },
  status: {
    backgroundColor: '#fff',
    padding: 8,
    paddingHorizontal: 15,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  statusActive: {
    backgroundColor: '#FBE9EC',
    padding: 8,
    paddingHorizontal: 15,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#FBE9EC',
  },
});
const mstp = state => ({
  notifications: state.NotificationReducer.notifications,
  types_notification: state.NotificationReducer.types_notification,
  refreshing: state.NotificationReducer.refreshing,
  CdValue: state.NotificationReducer.CdValue,
  codes: state.AppReducer.codes,
});
const mdtp = dispatch => ({
  onGetNotification: data => dispatch(actions.getNotification(data)),
  onChangeValue: value => dispatch(actions.changeValueType(value)),
  onGetTypeNotification: payload =>
    dispatch(actions.getTypeNotification(payload)),
});
export default connect(mstp, mdtp)(Notification);
