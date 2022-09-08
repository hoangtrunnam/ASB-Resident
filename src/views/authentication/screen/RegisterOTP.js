import React, { useState, useRef, useEffect } from 'react';
import {
  Text,
  View,
  TextInput as TextInputHide,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import TouchGradient from '../../Shared/TouchGradient';

const TIMER_OTP = 120;

const RegisterOTP = ({ navigation, route }) => {
  const [otp, setOtp] = useState('');
  const arrayOtp = [...Array(4)];
  const otpRef = useRef(null);
  const [secondRemain, setSecondRemain] = useState(TIMER_OTP);
  const [status, setStatus] = useState(''); //SEND,RESEND,NORMAL

  const timer = () => {
    const startTime = Date.now();
    this.t = setInterval(() => {
      let secondElapsed = Math.floor((Date.now() - startTime) / 1000);
      if (secondElapsed > TIMER_OTP) {
        stopClock();
      } else {
        setSecondRemain(TIMER_OTP - secondElapsed);
      }
    }, 350);
  };
  const stopClock = () => {
    clearInterval(this.t);
  };
  const onSubmit = () => {
    stopClock();
    setSecondRemain(TIMER_OTP);
    requestAnimationFrame(() => {
      navigation.navigate('register_success', { ...route.params });
    });
  };
  const resendOTP = () => {
    timer();
  };
  useEffect(() => {
    timer();
    return () => {
      clearInterval(this.t);
    };
  }, []);
  const phone_number = route.params?.phone_number || '0982112395';
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.text_hint}>
          Chúng tôi đã gửi tin nhắn chứa mã OTP vào số điện thoại{' '}
          <Text style={styles.text_bold}>{phone_number}</Text>
        </Text>
        <View style={styles.otp}>
          {arrayOtp.map((item, index) => {
            let code = otp.charAt(index);
            return (
              <TouchableOpacity
                onPress={() => otpRef.current.focus()}
                style={[
                  styles.btn_item_otp,
                  {
                    borderBottomColor: code ? '#E46559' : '#E5E5E5',
                    borderBottomWidth: 2,
                    height: 60,
                    width: 32,
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}
                key={index + ''}>
                <Text style={styles.btn_item_otp_text}>
                  {otp.charAt(index)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <TextInputHide
          value={otp}
          onChangeText={value => setOtp(value)}
          ref={otpRef}
          keyboardType="number-pad"
          maxLength={4}
          style={{ height: 0 }}
          returnKeyType="done"
        />
        <View style={styles.timer}>
          {/* {secondRemain < TIMER_OTP ? ( */}
          <>
            <Text style={styles.text_hint}>
              {secondRemain === 0
                ? `Không nhận được mã OTP?`
                : `Mã xác thực sẽ hết hạn sau:`}{' '}
            </Text>
            <TouchableOpacity
              onPress={resendOTP}
              disabled={secondRemain ? true : false}>
              {secondRemain === 0 ? (
                <Text style={styles.re_send_txt}>Gửi lại</Text>
              ) : (
                <Text
                  style={[
                    styles.text_hint,
                    styles.re_send_txt,

                    { textDecorationLine: 'none' },
                  ]}>
                  {secondRemain} giây
                </Text>
              )}
            </TouchableOpacity>
          </>
          {/* ) : null} */}
        </View>
        <TouchGradient
          title="Tiếp tục"
          onPress={onSubmit}
          disabled={!(otp.length === 4)}
        />
        <View style={styles.center}>
          <Text style={styles.text_hint}>Bạn đã có tài khoản? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.login_txt}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegisterOTP;
