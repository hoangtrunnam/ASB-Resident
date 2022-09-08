import React from 'react';
import { View, Text, StyleSheet, TextInput, Alert, Keyboard } from "react-native";
import {SafeAreaView} from 'react-navigation';
import {Button} from '../../../components/Button';
import {Ultils} from '../../../config/Ultils';
import {connect} from 'react-redux';
import { actions } from "../action";
import { colors } from "../../../config/colors";

class EnterInformation extends React.Component {
  static navigationOptions = {
    title: '',
  };

  constructor(props) {
    super(props);
    const {AuthCode, ResultAuthCode} = this.props.navigation.state.params;
    this.state = {
      UserName: '',
      FullName: '',
      AuthCode: AuthCode,
      Password: '',
      VertifiedPassword: '',
      UserType: this.props.UserType,
      ApartmentId: ResultAuthCode.Id,
      OwnerPhone: '',
    };
    this.handleRegister = this.handleRegister.bind(this);
  }

  async handleRegister() {
    const {UserName, FullName, Password, VertifiedPassword} = this.state;
    if (!UserName) {
      Alert.alert('Thông báo', 'Vui lòng nhập số điện thoại');
      return;
    }
    if (!FullName) {
      Alert.alert('Thông báo', 'Vui lòng nhập họ và tên');
      return;
    }
    if (!Password) {
      Alert.alert('Thông báo', 'Vui lòng nhập mật khẩu');
      return;
    }
    if (!VertifiedPassword) {
      Alert.alert('Thông báo', 'Vui lòng nhập lại mật khẩu');
      return;
    }
    if (Password !== VertifiedPassword) {
      Alert.alert('Thông báo', 'Mật khẩu nhập lại không đúng');
      return;
    }
    this.props.doRegister(this.state);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.infor}>
          <Text style={styles.txtLabel}>Họ và tên</Text>
          <TextInput
            style={Ultils.ios ? styles.input : styles.inputAndroid}
            placeholder={'Nhập họ và tên'}
            placeholderTextColor={'#888'}
            returnKeyLabel={'Done'}
            returnKeyType={'done'}
            value={this.state.FullName}
            onChangeText={FullName => this.setState({FullName})}
          />
          <Text style={styles.txtLabel}>Số điện thoại</Text>
          <TextInput
            style={Ultils.ios ? styles.input : styles.inputAndroid}
            placeholder={'Số điện thoại'}
            placeholderTextColor={'#888'}
            keyboardType={'numeric'}
            returnKeyLabel={'Done'}
            returnKeyType={'done'}
            value={this.state.UserName}
            onChangeText={UserName => this.setState({UserName})}
          />
          <Text style={styles.txtLabel}>Mật khẩu</Text>
          <TextInput
            style={Ultils.ios ? styles.input : styles.inputAndroid}
            placeholder={'Mật khẩu'}
            placeholderTextColor={'#888'}
            secureTextEntry={true}
            value={this.state.Password}
            onChangeText={Password => this.setState({Password})}
            blurOnSubmit={false}
            onSubmitEditing={() => Keyboard.dismiss()}
          />
          <Text style={styles.txtLabel}>Nhập lại mật khẩu</Text>
          <TextInput
            style={Ultils.ios ? styles.input : styles.inputAndroid}
            placeholder={'Nhập lại mật khẩu'}
            placeholderTextColor={'#888'}
            secureTextEntry={true}
            value={this.state.VertifiedPassword}
            onChangeText={VertifiedPassword =>
              this.setState({VertifiedPassword})
            }
            blurOnSubmit={false}
            onSubmitEditing={() => Keyboard.dismiss()}
          />
          <View style={styles.bottom}>
            <Button title={'Đăng ký'} onPress={this.handleRegister} />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1},
  txtNotice: {flex: 1, color: '#888'},
  txtLabel: {fontWeight: '500', color: '#444444'},
  txtInfor: {color: '#888', fontWeight: '600'},
  infor: {margin: 16, flex: 1},
  tnr: {color: '#000', fontWeight: '600'},
  input: {
    width: '100%',
    color: '#000',
    fontWeight: '500',
    height: 32,
    marginBottom: 16,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  inputAndroid: {
    width: '100%',
    color: '#000',
    fontWeight: '500',
    paddingVertical: 8,
    marginVertical: 8,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  link: {color: colors.main, fontWeight: '600', flex: 1},
  bottom: {marginHorizontal: 16},
});
const mstp = state => ({
  UserType: state.AuthReducer.user_type,
  success: state.AuthReducer.success,
  error: state.AuthReducer.error,
});

const mdtp = dispatch => ({
  doRegister: data => dispatch(actions.doRegister(data)),
});

export default connect(mstp, mdtp)(EnterInformation);
