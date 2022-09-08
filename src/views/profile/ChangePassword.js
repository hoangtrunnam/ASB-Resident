import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Button} from '../../components/Button';
import {connect} from 'react-redux';
import {actions} from './action';
import {Ultils} from '../../config/Ultils';
import {colors} from '../../config/colors';

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Password: '',
      NewPassword: '',
      RePassword: '',
    };
  }

  _setPassword = async () => {
    const {Password, NewPassword, RePassword} = this.state;
    const {phoneNumber, appKey} = this.props;
    const UserName = await Ultils.username();
    if (!Password && !NewPassword && !RePassword) {
      Alert.alert('Thông báo', 'Yêu cầu nhập mật khẩu');
    } else if (NewPassword !== RePassword) {
      Alert.alert('Thông báo', 'Mật khẩu nhập lại không đúng');
    } else {
      const data = [
        {
          FieldID: 'C01',
          FieldType: 'STR',
          Value: Password,
        },
        {
          FieldID: 'C02',
          FieldType: 'STR',
          Value: NewPassword,
        },
        {
          FieldID: 'C03',
          FieldType: 'STR',
          Value: RePassword,
        },
      ];
      this.props.onChangePassword(data);
    }
  };

  render() {
    const {navigation} = this.props;
    const {Password, NewPassword, RePassword} = this.state;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <ScrollView
            style={{flex: 1}}
            keyboardDismissMode={'on-drag'}
            showsVerticalScrollIndicator={false}>
            <View style={styles.infor}>
              <Text style={styles.txtLabel}>Mật khẩu cũ</Text>
              <TextInput
                style={Ultils.ios ? styles.input : styles.inputAndroid}
                placeholder={'Nhập mật khẩu cũ'}
                placeholderTextColor={'#C1C1C1'}
                secureTextEntry={true}
                value={Password}
                onChangeText={Password => this.setState({Password})}
              />
              <Text style={styles.txtLabel}>Mật khẩu mới</Text>
              <TextInput
                style={Ultils.ios ? styles.input : styles.inputAndroid}
                placeholder={'Nhập mật khẩu mới'}
                placeholderTextColor={'#C1C1C1'}
                secureTextEntry={true}
                value={NewPassword}
                onChangeText={NewPassword => this.setState({NewPassword})}
              />
              <Text style={styles.txtLabel}>Xác nhận mật khẩu mới</Text>
              <TextInput
                style={Ultils.ios ? styles.input : styles.inputAndroid}
                placeholder={'Nhập xác nhận mật khẩu mới'}
                placeholderTextColor={'#C1C1C1'}
                secureTextEntry={true}
                value={RePassword}
                onChangeText={RePassword => this.setState({RePassword})}
              />
            </View>
          </ScrollView>
          <View style={styles.bottom}>
            <Button title={'Thay đổi'} onPress={this._setPassword} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1},
  notice: {
    backgroundColor: '#FFF2E9',
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
  },
  txtNotice: {flex: 1, color: '#888'},
  txtInfor: {color: '#888', fontWeight: '600'},
  txtLabel: {color: '#444', fontWeight: '600'},
  infor: {margin: 16, flex: 1},
  tnr: {color: '#000', fontWeight: '600'},
  input: {
    width: '100%',
    color: '#444444',
    fontWeight: '500',
    height: 32,
    marginVertical: 16,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  inputAndroid: {
    width: '100%',
    color: '#444444',
    fontWeight: '500',
    paddingVertical: 8,
    marginVertical: 8,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  link: {color: colors.main, fontWeight: '600', flex: 1},
  bottom: {marginHorizontal: 16},
});
const mstp = state => ({});
const mdtp = dispatch => ({
  onChangePassword: payload => dispatch(actions.changePassword(payload)),
});

export default connect(mstp, mdtp)(ChangePassword);
