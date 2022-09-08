import React from 'react';
import {View, Text, StyleSheet, Image, ImageBackground} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {Ultils} from '../../../config/Ultils';
import {Button} from '../../../components/Button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {actions} from '../action';
import {CONST} from '../../../constant/const';
import { colors } from "../../../config/colors";

class Introduction extends React.Component {
  constructor(props) {
    super(props);
    this.navigateScreen = this.navigateScreen.bind(this);
  }

  navigateScreen(screen, user_type) {
    this.props.navigation.navigate(screen);
    this.props.changeUserType(user_type);
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView
          forceInset={{bottom: 'always', top: 'never'}}
          style={styles.container}>
          <View style={styles.container}>
            <View style={{flex: 1, marginHorizontal: 16}}>
              <View style={styles.viewWelcome}>
                <Image
                  source={require('../../../assets/images/logo.png')}
                  resizeMode={'contain'}
                  style={{
                    width: Ultils.dimensions.width / 4,
                    height: Ultils.dimensions.width / 4,
                    marginVertical: 20
                  }}
                />
                <Text style={styles.welcome}>Chào mừng bạn đến với</Text>
                <Text style={styles.tnr}>ASB Resident</Text>
              </View>
              <Button
                title={'Tôi là cư dân'}
                onPress={() =>
                  this.navigateScreen(
                    'ResidentInformation',
                    CONST.USER_TYPE.RESIDENT,
                  )
                }
              />
              <Button
                title={'Tôi là khách thuê'}
                styleButton={{backgroundColor: 'transparent'}}
                styleTitle={{color: '#DA0F2D', fontWeight: '500'}}
                onPress={() =>
                  this.navigateScreen(
                    'ResidentInformation',
                    CONST.USER_TYPE.RENTER,
                  )
                }
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                }}>
                {/*<Icon name={'arrow-left'} size={16} color={'#DA0F2D'}/>*/}
                <Text
                  style={styles.backLogin}
                  onPress={() => this.props.navigation.goBack()}>
                  Quay trở lại ĐĂNG NHẬP
                </Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {flex: 1},
  img: {
    width: Ultils.dimensions.width,
    height: Ultils.dimensions.height / 2.5,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  },
  logo: {
    width: Ultils.dimensions.width / 2,
    height: '100%',
    tintColor: '#fff',
  },
  viewWelcome: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  welcome: {fontSize: 16, color: '#444'},
  tnr: {fontSize: 36, color: colors.main, fontWeight: '600'},
  bg: {
    position: 'absolute',
    bottom: -30,
    right: '-40%',
    width: Ultils.dimensions.width,
    height: Ultils.dimensions.width / 1.5,
    zIndex: -1,
  },
  backLogin: {
    fontSize: 16,
    marginLeft: 12,
    textDecorationLine: 'underline',
    padding: 8,
    color: '#444',
  },
});

const mstp = state => {
  return {
    user_type: state.AuthReducer.user_type,
  };
};
const mdtp = dispatch => ({
  changeUserType: user_type => dispatch(actions.changeUserType(user_type)),
});

export default connect(mstp, mdtp)(Introduction);
