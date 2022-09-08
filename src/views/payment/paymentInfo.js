import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {SafeAreaView} from 'react-navigation';
import {searchModule} from '../../core/modules/search';
import {ModuleInfos} from '../../core/moduleList';
import {isError, formatNumber, formatDate} from '../../core/utils';
import {styles} from './style';
import {translateCodeByCodeValue, translateCodeSync} from '../../core/services';

const Item = ({label, value}) => {
  if (!value) {
    return null;
  }
  return (
    <View style={[styles.row, styles.listItem]}>
      <Text>{label}</Text>
      <Text>{value}</Text>
    </View>
  );
};

export default class PaymentInfo extends Component {
  render() {
    const {navigation} = this.props;
    const {paymentInfo} = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <View style={[styles.container, {backgroundColor: '#f4f4f4'}]}>
          <ScrollView style={styles.container}>
            <View style={[styles.cardItem]}>
              <Text style={styles.cartHeaderText}>Thông tin giao dịch</Text>
              <Item
                label={'Dịch vụ'}
                value={translateCodeByCodeValue(
                  ':BMS.SERVICE_TYPE',
                  paymentInfo.SERVICE_TYPE,
                )}
              />
              <Item label={'Số hoá đơn'} value={paymentInfo.CODE} />
              <Item
                label={'Ngày hoá đơn'}
                value={formatDate(paymentInfo.SERVICE_DATE)}
              />
              <Item
                label={'Từ ngày'}
                value={formatDate(paymentInfo.FROM_DATE)}
              />
              <Item
                label={'Đến ngày'}
                value={formatDate(paymentInfo.END_DATE)}
              />
              <Item label={'Chỉ số đầu'} value={paymentInfo.START_INDEX} />
              <Item label={'Chỉ số cuối'} value={paymentInfo.END_INDEX} />
              <Item label={'Tiêu thụ'} value={paymentInfo.USED_INDEX} />
              <Item
                label={'Đơn giá phí thoát nước'}
                value={formatNumber(paymentInfo.EXPORT_WATER)}
              />
              <Item
                label={'Giá'}
                value={formatNumber(paymentInfo.MONTH_PRICE)}
              />
              <Item
                label={'Số lượng'}
                value={formatNumber(paymentInfo.QUANTITY)}
              />
              <Item
                label={'Đơn vị tính'}
                value={formatNumber(paymentInfo.UNIT)}
              />
              <Item
                label={'Thuế suất'}
                value={
                  paymentInfo.VAT_PERCENT
                    ? `${paymentInfo.VAT_PERCENT} %`
                    : null
                }
              />
              <Item label={'Mô tả'} value={paymentInfo.DESCRIPTION} />
            </View>
            <View style={[styles.cardItem]}>
              <Text style={styles.cartHeaderText}>Thông tin thanh toán</Text>
              <Item
                label={'Thành tiền'}
                value={formatNumber(paymentInfo.TOTAL)}
              />
              <Item
                label={'Thuế'}
                value={formatNumber((paymentInfo.TOTAL * paymentInfo.VAT_PERCENT).toFixed(0) / 100)}
              />
              <Item
                label={'Phí thoát nước'}
                value={formatNumber(paymentInfo.TOTAL_EXPORT_WATER)}
              />
              <View style={[styles.row, styles.listItem]}>
                <Text>Tổng cộng</Text>
                <Text style={styles.amountText}>
                  {formatNumber(paymentInfo.SUMMARY)} đ
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
