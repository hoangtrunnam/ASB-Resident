import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {SafeAreaView} from 'react-navigation';
import {searchModule} from '../../core/modules/search';
import {ModuleInfos} from '../../core/moduleList';
import {isError, formatNumber, formatDate} from '../../core/utils';
import {styles} from './style';
import DateTimePickerModal from '../../components/DateTimePickerModal';
import {colors} from '../../config/colors';
import {translateCodeByCodeValue} from '../../core/services';
import Picker from '../../components/Picker';

// const MAP_SERVICE_TYPES = {
//   1: {title: 'Điện'},
//   2: {title: 'Nước'},
//   3: {title: 'Vé Xe'},
//   4: {title: 'Dịch vụ cơ bản'},
// };

const MAP_SERVICE_TYPES = [
  {id: 1, CdValueName: 'Điện'},
  {id: 2, CdValueName: 'Nước'},
  {id: 3, CdValueName: 'Vé Xe'},
  {id: 4, CdValueName: 'Dịch vụ cơ bản'},
];

const Payment = ({navigation}) => {
  const conditionsRef = useRef();
  const [paymentList, setPaymentList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [date, setDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [visibleType, setVisibleType] = useState(false);
  const [type, setType] = useState('');
  const [clonePayment, setClonePayment] = useState([]);
  const [types, setTypes] = useState([]);
  const handleConfirm = datePick => {
    const isStart = date.type === 'MIN';
    if (conditionsRef.current) {
      conditionsRef.current = conditionsRef.current
        .filter(x => x.Operator !== (isStart ? '009' : '010'))
        .concat({
          ConditionID: 'D03',
          Operator: isStart ? '009' : '010',
          Value: formatDate(datePick, 'YYYY-MM-DD'),
          ID: 1,
        });
    } else {
      conditionsRef.current = [
        {
          ConditionID: 'D03',
          Operator: '009',
          Value: formatDate(datePick, 'YYYY-MM-DD'),
          ID: 1,
        },
      ];
    }
    hidePicker();
    if (date.type === 'MIN') {
      setStartDate(datePick);
    } else {
      setEndDate(datePick);
    }
    getPaymentList(conditionsRef.current);
  };
  const hidePicker = () => {
    setDate(null);
  };

  // Format lai list cac loai
  const formatType = data => {
    return data.map(item => {
      return {
        id: item,
        CdValueName: translateCodeByCodeValue(':BMS.SERVICE_TYPE', item),
      };
    });
  };

  const getPaymentList = (conditions = []) => {
    console.warn('getPaymentList -> conditions', conditions);
    setRefreshing(true);
    searchModule
      .executeSearch(ModuleInfos.getPaymentList, [], 20, conditions)
      .then(searchResult => {
        setRefreshing(false);
        if (isError(searchResult)) {
          // alert(searchResult.message);
          getPaymentList();
          return;
        }
        setPaymentList(searchResult.result.data || []);
        setClonePayment(searchResult.result.data || []);
        // Loai bo cac truong SERVICE_TYPE trung nhau
        const filterType = [
          ...new Set(searchResult.result.data.map(item => item.SERVICE_TYPE)),
        ];
        setTypes(formatType(filterType));

        // setTypes();
      });
  };
  useEffect(() => {
    getPaymentList();
  }, []);

  const onSelectType = item => {
    if (item.id === type.id) {
      setType('');
      setVisibleType(false);
    } else {
      setType(item);
      setVisibleType(false);
    }
  };

  useEffect(() => {
    if (type) {
      const filterPayment = clonePayment.filter(
        payment => payment.SERVICE_TYPE === String(type.id),
      );
      setPaymentList(filterPayment);
    } else {
      getPaymentList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <DateTimePickerModal
          isVisible={date}
          mode={'date'}
          onConfirm={handleConfirm}
          date={date?.defaultDate || new Date()}
          locale="vi-VN"
          onCancel={hidePicker}
          confirmTextIOS="Xác nhận"
          cancelTextIOS="Huỷ bỏ"
          headerTextIOS={date?.headerTextIOS}
          minimumDate={new Date(1950, 0, 1)}
          maximumDate={new Date()}
        />
      </View>
      <View>
        <Picker
          title={'Loại hoá đơn'}
          data={types}
          onSelect={onSelectType}
          value={type.CdValueName}
          visible={visibleType}
          onRequestClose={() => setVisibleType(false)}
        />
      </View>
      <View style={styles.container}>
        <View
          style={[
            styles.card,
            styles.row,
            // styles.selectTime,
            {paddingVertical: 0, marginBottom: 4},
          ]}>
          <TouchableOpacity
            style={[styles.row, {flex: 1, justifyContent: 'space-between'}]}
            onPress={() => {
              setVisibleType(true);
            }}>
            <View>
              <Text style={{paddingBottom: 4, color: '#444'}}>Loại</Text>
              <Text>{type.CdValueName ? type.CdValueName : '--'}</Text>
            </View>
            <Icon name={'chevron-down'} color={'#666'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.row,
              {flex: 1, justifyContent: 'space-between', marginLeft: 8},
            ]}
            onPress={() =>
              setDate({
                type: 'MIN',
                headerTextIOS: 'Từ ngày',
                defaultDate: startDate,
              })
            }>
            <View
              style={{
                borderLeftColor: '#F4F4F4',
                borderLeftWidth: 1,
                paddingLeft: 8,
              }}>
              <Text style={{paddingBottom: 4, color: '#444'}}>Từ ngày</Text>
              <Text>{startDate ? formatDate(startDate) : '--'}</Text>
            </View>
            <Icon name={'chevron-down'} color={'#666'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.row,
              {flex: 1, justifyContent: 'space-between', marginLeft: 8},
            ]}
            onPress={() =>
              setDate({
                type: 'MAX',
                headerTextIOS: 'Đến ngày',
                defaultDate: endDate,
              })
            }>
            <View
              style={{
                borderLeftColor: '#F4F4F4',
                borderLeftWidth: 1,
                paddingLeft: 8,
              }}>
              <Text style={{paddingBottom: 4, color: '#444'}}>Đến ngày</Text>
              <Text>{endDate ? formatDate(endDate) : '--'}</Text>
            </View>
            <Icon name={'chevron-down'} color={'#666'} />
          </TouchableOpacity>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => getPaymentList()}
              tintColor={'#DA0F2D'}
            />
          }
          data={paymentList}
          contentContainerStyle={{flexGrow: 1}}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 16, color: '#A1A1A1'}}>
                Chưa có dữ liệu
              </Text>
            </View>
          }
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={[styles.card, {marginBottom: 8}]}
                onPress={() =>
                  navigation.navigate('PaymentInfo', {
                    paymentInfo: item,
                  })
                }>
                <View style={[styles.row, {justifyContent: 'space-between'}]}>
                  <Text style={{fontWeight: '500'}}>
                    {translateCodeByCodeValue(
                      ':BMS.SERVICE_TYPE',
                      item.SERVICE_TYPE,
                    )}
                  </Text>
                  <Text>
                    <Icon name={'calendar'} size={13} />{' '}
                    {formatDate(item.SERVICE_DATE)}
                  </Text>
                </View>
                <View
                  style={[
                    styles.row,
                    {
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingTop: 12,
                    },
                  ]}>
                  <Text style={{fontSize: 16}}>Số tiền</Text>
                  <Text style={styles.pricetext}>
                    {formatNumber(item.TOTAL)} đ
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

export default Payment;
