import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TextInput,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {Ultils} from '../../../config/Ultils';
import {Button} from '../../../components/Button';
import {connect} from 'react-redux';
import {actions} from '../action';
import {colors} from '../../../config/colors';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '', //0975624251 - 0969866986
      password: '', //123
      /* username: "",
      password: "", */
    };
    this.login = this.login.bind(this);
  }

  login() {
    const {phoneNumber} = this.props;
    let {username, password} = this.state;
    if (phoneNumber) {
      username = phoneNumber;
    }
    // console.log(username);
    if (!username || !password) {
      Alert.alert('Thông báo', 'Vui lòng nhập số điện thoại hoặc mật khẩu');
    } else {
      this.props.onLogin({username, password});
    }
  }

  render() {
    const {navigation, phoneNumber} = this.props;
    const {username = phoneNumber, password} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 20,
              flex: 1,
            }}>
            <Image
              source={require('../../../assets/images/logo.png')}
              style={{
                width: Ultils.dimensions.width / 4,
                height: Ultils.dimensions.width / 4,
              }}
              resizeMode={'contain'}
            />
          </View>
          <View style={{flex: 3}}>
            <View style={styles.formLogin}>
              <View style={styles.infor}>
                <Text style={styles.txtLogin}>Đăng Nhập</Text>
                <Text style={styles.txtLabel}>Số điện thoại</Text>
                <TextInput
                  style={Ultils.ios ? styles.input : styles.inputAndroid}
                  placeholder={'Nhập số điện thoại'}
                  placeholderTextColor={'#888'}
                  keyboardType={'numeric'}
                  returnKeyLabel={'Done'}
                  returnKeyType={'done'}
                  value={username}
                  onChangeText={username => this.setState({username})}
                />
                <Text style={styles.txtLabel}>Mật khẩu</Text>
                <TextInput
                  style={Ultils.ios ? styles.input : styles.inputAndroid}
                  placeholder={'Nhập mật khẩu'}
                  placeholderTextColor={'#888'}
                  secureTextEntry={true}
                  returnKeyLabel={'Done'}
                  returnKeyType={'done'}
                  value={password}
                  onChangeText={password => this.setState({password})}
                  onEndEditing={this.login}
                />
                {/*  <Text
                  style={styles.forgotPassword}
                  onPress={() =>
                    this.props.navigation.navigate("ForgotPassword")
                  }
                >
                  Quên mật khẩu
                </Text> */}
                <Button title={'Đăng nhập'} onPress={this.login} />
              </View>
            </View>
          </View>
        </View>
        <Button
          title={'Bạn chưa có tài khoản?'}
          onPress={() => navigation.navigate('Introduction')}
          styleButton={{backgroundColor: 'transparent'}}
          styleTitle={{color: colors.main}}
        />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {flex: 1},
  img: {
    width: Ultils.dimensions.width,
    height: Ultils.dimensions.height / 3.5,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  },
  logo: {height: 120, tintColor: '#fff'},
  viewWelcome: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  welcome: {fontSize: 16, color: '#444'},
  tnr: {fontSize: 36, color: '#444', fontWeight: '600'},
  bg: {
    position: 'absolute',
    bottom: -30,
    right: '-40%',
    width: Ultils.dimensions.width,
    height: Ultils.dimensions.width / 1.5,
    zIndex: -1,
  },
  txtLabel: {color: '#444', fontWeight: '600'},
  infor: {margin: 16, paddingVertical: 16},
  input: {
    width: '100%',
    color: '#000',
    fontWeight: '500',
    height: 32,
    marginVertical: 16,
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
  txtLogin: {
    color: '#323232',
    fontSize: 24,
    marginBottom: 30,
    fontWeight: '500',
  },
  formLogin: {
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  forgotPassword: {paddingVertical: 8, color: '#3784FF', marginVertical: 10},
});
const mstp = state => ({
  phoneNumber: state.AuthReducer.phoneNumber,
});
const mdtp = dispatch => ({
  onLogin: data => dispatch(actions.login(data)),
});

export default connect(mstp, mdtp)(Login);
