import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Button} from '../../components/Button';

import {searchModule} from '../../core/modules/search';
import {ModuleInfos} from '../../core/moduleList';
import {
  isError,
  formatDate,
  getSessionKey,
  formatNumber,
  formatDatePeriod,
} from '../../core/utils';
import {SafeAreaView} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import {CONST} from '../../constant/const';
const Bottom = ({idx, navigation, data}) => {
  console.log('data tổng nợ:',data );
  let tong_cong_no = 0,
    tong_co = 0;
  tong_cong_no =
    data.length > 0 &&
    data?.reduce((prev, current) => {
      return prev + current.START_DEBT + current.PROFIT_DEBT - current.PROFIT_CREBIT;
    }, 0);
  tong_co =
    data.length > 0 &&
    data?.reduce((prev, current) => {
      return prev + current.START_CREBIT + current.END_CREBIT;
    }, 0);
  const da_thanh_toan = data.reduce((prev, current) => {
    return prev + current.RECEIVE_AMT;
  }, 0);
  switch (idx) {
    case 0:
      return (
        <SafeAreaView style={[styles.row, styles.bottom]}>
          <View style={{ paddingVertical: 20}}>
            <Text style={{color: '#A1A1A1', fontSize: 16}}>
              Tổng nợ:{' '}
              <Text style={{fontWeight: 'bold', color: '#DA0000'}}>
                {formatNumber(tong_cong_no || 0)}
              </Text>
            </Text>
          </View>
        </SafeAreaView>
      );
    case 1:
      return (
        <SafeAreaView style={[styles.row, styles.bottom]}>
          <View style={{flex: 2}}>
            <Text style={{color: '#A1A1A1', fontSize: 16}}>Tổng nợ</Text>
            <Text
              style={{
                color: '#DA0000',
                fontWeight: 'bold',
                fontSize: 16,
                marginTop: 4,
              }}>
              {formatNumber(tong_cong_no)}
            </Text>
          </View>
        </SafeAreaView>
      );
    case 2:
      return (
        <SafeAreaView
          style={[
            styles.row,
            styles.bottom,
            {justifyContent: 'space-between', paddingVertical: 16},
          ]}>
          <Text style={{color: '#A1A1A1', fontSize: 16}}>
            Tổng tiền đã thanh toán:
          </Text>
          <Text style={{color: '#03A000', fontWeight: 'bold', fontSize: 16}}>
            {formatNumber(da_thanh_toan)}
          </Text>
        </SafeAreaView>
      );
    default:
      return;
  }
};

class Debt extends Component {
  static navigationOptions = () => ({
    title: '',
  });
  state = {
    idx: 0,
    data: [],
  };

  selectTab(idx) {
    this.setState({idx});
  }
  componentDidMount() {
    this.getDebt();
  }
  async getDebt() {
    const DEPARTMENT = await AsyncStorage.getItem(CONST.DEPARTMENT);
    searchModule
      .executeSearch(ModuleInfos.getDebtInfo, [], 9999, [
        {
          ConditionID: 'D99',
          Operator: '003',
          Value: DEPARTMENT,
          ID: 1,
        },
      ])
      .then(searchResult => {
        if (isError(searchResult)) {
          alert(searchResult.message);
          return;
        }
        this.setState({data: searchResult.result.data || []});
      });
  }

  render() {
    const {idx, data} = this.state;
    console.log("data công nợ: ",data);
    return (
      <SafeAreaView style={styles.container} forceInset={{bottom: 'always'}}>
        <View flex={1}>
          <FlatList
            data={data}
            ListEmptyComponent={
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <Text style={{color: '#a1a1a1', fontSize: 16}}>
                  Không có công nợ
                </Text>
              </View>
            }
            renderItem={({item, index}) => {
              return (
                <View style={[styles.card, {marginBottom: 0}]}>
                  <View style={[styles.row, {justifyContent: 'space-between'}]}>
                    <View style={styles.row}>
                      <Text style={{color: '#A1A1A1', fontSize: 16}}>
                        Kỳ:{' '}
                        <Text style={styles.text_normal}>
                          {item.DEBT_PERIOD}
                        </Text>
                      </Text>
                    </View>
                    {/* <Text style={styles.text_normal}>Nộp trực tiếp</Text> */}
                  </View>
                  <View style={[styles.row, {justifyContent: 'space-between'}]}>
                    <Text style={{color: '#A1a1a1', fontSize: 16}}>Căn hộ</Text>
                    <Text style={styles.text_normal}>
                      {item.APARTMENT_CODE}
                    </Text>
                  </View>
                  <View style={[styles.row, {justifyContent: 'space-between'}]}>
                    <Text style={{color: '#A1a1a1', fontSize: 16}}>
                      Nợ đầu kỳ
                    </Text>
                    <Text style={styles.text_normal}>
                      {formatNumber(item.START_DEBT)}
                    </Text>
                  </View>
                  <View style={[styles.row, {justifyContent: 'space-between'}]}>
                    <Text style={{color: '#A1a1a1', fontSize: 16}}>
                      Phát sinh
                    </Text>
                    <Text style={styles.text_normal}>
                      {formatNumber(item.PROFIT_DEBT)}
                    </Text>
                  </View>
                  <View style={[styles.row, {justifyContent: 'space-between'}]}>
                    <Text style={{color: '#A1a1a1', fontSize: 16}}>
                      Đã đóng
                    </Text>
                    <Text style={styles.text_normal}>
                      {formatNumber(item.PROFIT_CREBIT)}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.row,
                      {
                        justifyContent: 'space-between',
                        borderTopWidth: 1,
                        borderTopColor: '#eee',
                        paddingTop: 8,
                      },
                    ]}>
                    <Text style={{color: '#a1a1a1', fontSize: 16}}>
                      Còn lại
                    </Text>
                    <Text
                      style={{
                        color: '#DA0000',
                        fontWeight: 'bold',
                        fontSize: 16,
                      }}>
                      {formatNumber(item.START_DEBT + item.PROFIT_DEBT - item.PROFIT_CREBIT) }
                    </Text>
                  </View>
                </View>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <Bottom idx={idx} navigation={this.props.navigation} data={data} />
      </SafeAreaView>
    );
  }
}
export default Debt;
