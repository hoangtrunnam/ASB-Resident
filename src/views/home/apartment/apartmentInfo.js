import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Ultils} from '../../../config/Ultils';
import {ModuleInfos} from '../../../core/moduleList';
import {getSessionKey, isError} from '../../../core/utils';
import {executeSearch, pageSize} from '../../../core/services/index';
import Info from './Info';
import {colors} from '../../../config/colors';
import {searchModule} from '../../../core/modules/search';
import moment from 'moment';
const Members = ({props, memberList}) => {
  console.log('memberList', memberList);
  return (
    <FlatList
      data={memberList}
      renderItem={({item, index}) => (
        <TouchableOpacity
          style={styles.itemNotification}
          onPress={() =>
            props.navigation.navigate('_CustomerInfo', {customer: item})
          }>
          <Image
            source={require('../../../assets/images/avatar.png')}
            style={{width: 32, height: 32}}
            resizeMode={'contain'}
          />
          <View style={{flex: 1, marginLeft: 16}}>
            <Text style={{fontWeight: 'bold'}}>{item.MEMBER_NAME}</Text>
            <Text style={{paddingVertical: 4}}>{item.MEMBER_PHONE_NUMBER}</Text>
          </View>
          <View>
            <Icon color="#aaa" name={'chevron-right'} size={16} />
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => index.toString()}
      ListEmptyComponent={
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 16,
          }}>
          <Image
            source={require('../../../assets/images/bell_notification.png')}
            style={{
              width: Ultils.dimensions.width / 5,
              height: Ultils.dimensions.width / 5,
            }}
            resizeMode={'contain'}
          />
          <Text style={{marginVertical: 8}}>Không có thành viên nào</Text>
        </View>
      }
    />
  );
};

class ApartmentInfo extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {item} = navigation.state.params;
    const name = item
      ? `${item.APARTMENT_CODE}`
      : '';
    return {
      headerLeft: () => (
        <View style={styles.left}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.btnBack}>
            <Icon name={'arrow-left'} size={16} color={'#fff'} />
          </TouchableOpacity>
          <Text
            numberOfLines={1}
            style={[styles.fs16, {color: '#fff', flex: 1}]}>
            {name}
          </Text>
        </View>
      ),
      headerStyle: {
        backgroundColor: colors.main,
      },
      title: '',
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      tab: '1', // L-global, R-private
      memberList: [],
    };
    this.onChangeTab = this.onChangeTab.bind(this);
  }

  componentDidMount = async () => {
    await this.getMember();
  };

  async getMember() {
    const {item} = this.props.navigation.state.params;
    let searchResult = await executeSearch({
      moduleInfo: ModuleInfos.getMemberByApartment,
      values: [{FieldID: 'C01', FieldType: 'DEC', Value: item.ID}],
      conditions: [],
      data: {
        pageSize: pageSize,
      },
      sessionId: await getSessionKey(),
    });
    console.log('03506:', searchResult);
    if (isError(searchResult)) {
      alert(searchResult.message);
      return;
    }
    this.setState({memberList: searchResult.result.data || []});
  }

  onChangeTab(tab) {
    this.setState({tab});
  }

  render() {
    const {tab, memberList} = this.state;
    const tabs = [
      {label: 'Căn hộ', position: '1'},
      {label: 'Thành viên', position: '2'},
      {label: 'Gửi xe', position: '3'},
    ];
    const {navigation} = this.props;
    const {item} = navigation.state.params;
    return (
      <View style={styles.container}>
        <View style={[styles.row]}>
          <Tabs tabs={tabs} tab={tab} onchangeTab={this.onChangeTab} />
        </View>
        <ScrollView style={{flex: 1}}>
          {tab === '1' && <Info apartment={item} />}
          {tab === '2' && (
            <Members props={this.props} memberList={memberList || []} />
          )}
          {tab === '3' && (
            <Services/>
          )}
        </ScrollView>
      </View>
    );
  }
}
// thông tin gửi xe ở đây:
const Services = () => {
  const [dataVehicle, setDataVehicle] = React.useState([]);

  const getVehicle = async () => {
    try {
      let searchResult = await searchModule.executeSearch(
        ModuleInfos.getVehicle,
      );
      setDataVehicle(searchResult?.result?.data);
    } catch (e) {
      console.log('error',e);
    }
  };
  console.log('dataVehicle ',dataVehicle);
  React.useEffect(() => {
    getVehicle();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <FlatList
        data={dataVehicle}
        renderItem={({ item, index})=>(
          <View style={{flex: 1}}>
          <View style={styles.row}>
            <Text style={styles.label}>Loại xe</Text>
            <Text style={styles.txtVehicle}>{item.TRANSPORT_TYPE}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Mã thẻ</Text>
            <Text style={styles.txtVehicle}>{item.TRANSPORT_NO}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Ngày đăng kí</Text>
            <Text style={styles.txtVehicle}>{moment(item.REGISTER_DATE).format("DD-MM-YYYY")}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Đã ngưng gửi</Text>
            <Text style={styles.txtVehicle}>{item.IS_EXPRIED==='Y'? 'Có':'Không'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Ngày ngưng gửi</Text>
            <Text style={styles.txtVehicle}>{item.EXPIRED_DATE?moment(item.EXPIRED_DATE).format("DD-MM-YYYY"):''}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Tên chủ xe</Text>
            <Text style={styles.txtVehicle}>{item.HOLDER_NAME}</Text>
          </View>
          <View style={[styles.row,{marginBottom:36}]}>
            <Text style={styles.label}>Biển số</Text>
            <Text style={styles.txtVehicle}>{item.LICENSE_NO}</Text>
          </View>
        </View>
        )}
        keyExtractor={item => `${item.ID}`}
        />
      </View>
    </View>
  );
};

const Tabs = ({tabs, tab, onchangeTab, children}) =>
  tabs.map((e, i) => (
    <TouchableOpacity
      key={i}
      style={e.position === tab ? styles.tabActive : styles.tabInactive}
      onPress={() => onchangeTab(e.position)}
      activeOpacity={0.8}>
      <Text
        style={e.position === tab ? styles.labelActive : styles.labelInactive}>
        {e.label}
      </Text>
    </TouchableOpacity>
  ));
const styles = StyleSheet.create({
  container: {flex: 1},
  cardMenu: {
    backgroundColor: '#fff',
    marginTop: 16,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 8,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {color: '#323232', fontWeight: 'bold'},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  label: {color: '#666', paddingHorizontal: 16, paddingVertical: 16},
  left: {flexDirection: 'row', alignItems: 'center', flex: 1},
  btnBack: {paddingHorizontal: 16, paddingVertical: 8},
  fs16: {fontSize: 16},
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
  labelActive: {fontSize: 16, fontWeight: '500', color: '#212121'},
  labelInactive: {fontSize: 16, color: '#A1A1A1'},
  itemNotification: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    paddingTop: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f4f4f4',
  },
  status: {backgroundColor: '#FBE9EC', padding: 8, borderRadius: 30},
  item: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 16,
    marginHorizontal: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  itemBot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FAEDDF',
    padding: 16,
  },
  txtVehicle: {
    color: '#212121',
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});

export default ApartmentInfo;
