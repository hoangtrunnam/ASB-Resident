import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import {httpService} from '../../services/httpService';
import {API} from '../../services/APIs';
import {actions, ActionTypes} from './action';
import * as NavigateService from '../../navigation/navigateService';
import {CONST} from '../../constant/const';
import {isError} from '../../config/Ultils';
import {login as executeLogin} from '../../core/services';
import {StoreKey} from '../../core/constanst';

function* residentRegister(action) {
  try {
    const response = yield httpService.postWithoutToken(
      'api/building/check-apartment-authcode',
      {
        AuthCode: action.payload,
      },
    );
    if (response.status === 'Ok') {
      yield put(actions.residentRegisterSuccess(response?.result));
      yield NavigateService.navigate('EnterInformation', {
        AuthCode: action.payload,
        ResultAuthCode: response.result,
      });
    } else {
      Alert.alert('Thông báo', 'Mã căn hộ không đúng');
    }
  } catch (e) {
    yield put(actions.residentRegisterError(e));
  }
}

export function* watchResidentRegister() {
  yield takeLatest(ActionTypes.RESIDENT_REGISTER, residentRegister);
}

//verifyOTP
function* verifyOTP(action) {
  try {
    const response = yield httpService.postWithoutToken(
      'api/auth/vertifyotp',
      action.payload.data,
    );
    if (response.status === 'Ok') {
      yield put(actions.verifyOTPSuccess(response?.result));
      yield NavigateService.navigate('SetPassword');
    } else {
      Alert.alert('Thông báo', response.reason, [
        {
          text: 'OK',
          onPress: function* () {
            yield put(actions.verifyOTPError(response.message));
          },
        },
      ]);
    }
  } catch (e) {
    console.log(e);
    yield put(actions.verifyOTPError(e));
  }
}

export function* watchVerifyOTP() {
  yield takeLatest(ActionTypes.VERIFY_OTP, verifyOTP);
}

//set password
function* setPassword(action) {
  console.log('function*setPassword -> action.payload', action.payload);
  try {
    const response = yield httpService.postWithoutToken(
      'api/auth/register',
      action.payload,
    );
    console.warn('function*setPassword -> response', response);
    if (response?.status === 'Ok') {
      yield put(actions.setPasswordSuccess(response.data));
      Alert.alert('Thông báo', 'Đăng ký thành công', [
        {
          text: 'Đăng nhập',
          onPress: () => {
            // AsyncStorage.setItem(CONST.TOKEN, response.data?.access_token);
            NavigateService.navigate('Login');
          },
        },
      ]);
    } else {
      Alert.alert('Thông báo', response.reason, [
        {
          text: 'OK',
          onPress: function* () {
            yield put(actions.setPasswordError(response.message));
          },
        },
      ]);
    }
  } catch (e) {
    console.log(e);
    yield put(actions.setPasswordError(e));
  }
}

export function* watchSetPassword() {
  yield takeLatest(ActionTypes.SET_PASSWORD, setPassword);
}

//login
function* login(action) {
  try {
    let response = yield executeLogin(action.payload);
    console.log('function*login -> response', response);
    if (isError(response)) {
      let message = response.message;
      if (['301', '303'].includes(response.message)) {
        message = 'Tài khoản hoặc mật khẩu không chính xác';
      }
      Alert.alert('Thông báo', message);
    } else {
      console.log({response});
      const fcmToken = yield AsyncStorage.getItem('fcmToken');
      const OldToken = yield AsyncStorage.getItem(StoreKey.FCM_TOKEN_OLD);
      const NewToken = yield AsyncStorage.getItem(StoreKey.FCM_TOKEN_CURRENT);
      const add_response = yield httpService.postWithToken(
        API.ADD_FCM_TOKEN,
        response.result.SessionKey,
        {
          AppKey: 'SmartBuilding',
          Username: action.payload.username,
          OldToken: OldToken || '',
          NewToken: NewToken || fcmToken,
        },
      );
      yield AsyncStorage.setItem(
        StoreKey.SessionKey,
        response.result.SessionKey,
      );
      yield AsyncStorage.setItem(
        StoreKey.Session,
        JSON.stringify(response.result),
      );
      NavigateService.navigate('ChooseProject');
    }
  } catch (e) {
    yield put(actions.loginError(e));
  }
}

export function* watchLogin() {
  yield takeLatest(ActionTypes.LOGIN, login);
}

function* renterRegister(action) {
  try {
    const response = yield httpService.postWithoutToken('api/auth/sendotp', {
      UserName: action.payload.UserName,
    });
    console.warn('function*residentRegister -> response', response?.result);
    if (response.status === 'Ok') {
      yield put(
        actions.renterRegisterSuccess({
          appKey: response?.result[0]?.OTPCode,
          UserName: action.payload.UserName,
          OwnerPhone: action.payload.OwnerPhone,
        }),
      );
      yield NavigateService.navigate('VerifyOTP');
    } else {
      Alert.alert('Thông báo', response.reason);
    }
    /* const response = yield httpService.postWithoutToken(
      API.RENTER_REGISTER,
      action.payload
    );
    // console.log({action, response});
    if (response.status) {
      yield put(actions.renterRegisterSuccess(response.data));
      NavigateService.navigate("VerifyOTP");
    } else {
      Alert.alert("Thông báo", response.message);
    } */
  } catch (e) {
    console.log({e});
    Alert.alert('Thông báo', e.message);
  }
}

export function* watchRenterRegister() {
  yield takeLatest(ActionTypes.RENTER_REGISTER, renterRegister);
}

//get project
function* getProject(action) {
  try {
    const response = yield httpService.getWithoutToken(
      'api/building/load-projects',
    );
    if (response.status === 'Ok') {
      yield put(actions.getProjectSuccess(response.result));
    } else {
      Alert.alert('Thông báo', response.message);
    }
  } catch (e) {
    console.log({e});
    Alert.alert('Thông báo', e.message);
  }
}
export function* watchGetProject() {
  yield takeLatest(ActionTypes.GET_PROJECT, getProject);
}
//get building by project id
function* getBuildingByProjectId(action) {
  // alert(JSON.stringify(action.payload));
  try {
    const uri = `api/building/load-buildings?projectId=${action.payload.projectId}`;
    const response = yield httpService.getWithoutToken(uri);
    console.log('function*getBuildingByProjectId -> response', response);
    if (response.status === 'Ok') {
      yield put(actions.getBuildingSuccess(response?.result || []));
    } else {
      Alert.alert('Thông báo', response.message);
    }
  } catch (e) {
    console.log({e});
    Alert.alert('Thông báo', e.message);
  }
}
export function* watchGetBuildingByProjectId() {
  yield takeLatest(
    ActionTypes.GET_BUILDING_BY_PROJECT_ID,
    getBuildingByProjectId,
  );
}
//get floors by building id
function* getFloors(action) {
  try {
    const uri = `api/building/load-floors?buildingId=${action.payload.buildingId}`;
    const response = yield httpService.getWithoutToken(uri);
    console.log('function*getFloors -> response', response);
    if (response.status === 'Ok') {
      yield put(actions.getFloorsSuccess(response?.result || []));
    } else {
      Alert.alert('Thông báo', response.message);
    }
  } catch (e) {
    console.log({e});
    Alert.alert('Thông báo', e.message);
  }
}
export function* watchGetFloors() {
  yield takeLatest(ActionTypes.GET_FLOORS, getFloors);
}

//get apartment by floor id
function* getApartment(action) {
  try {
    const uri = `api/building/load-apartments?floorId=${action.payload.floorId}`;
    const response = yield httpService.getWithoutToken(uri);
    console.log('function*getApartment -> response', response);
    if (response.status === 'Ok') {
      yield put(actions.getApartmentSuccess(response?.result));
    } else {
      Alert.alert('Thông báo', response.message);
    }
  } catch (e) {
    console.log({e});
    Alert.alert('Thông báo', e.message);
  }
}
export function* watchGetApartment() {
  yield takeLatest(ActionTypes.GET_APARTMENT, getApartment);
}
//resend OTP
function* resendOTP(action) {
  /*  try {
   const response = yield httpService.postWithoutToken(
      API.RESEND_OTP,
      action.payload
    );
    if (response.status) {
      yield put(actions.resendOTPSuccess(response.data)); */
  NavigateService.navigate('VerifyOTP');
  /*  } else {
      Alert.alert("Thông báo", response.message);
    }
  } catch (e) {
    console.log({ e });
    Alert.alert("Thông báo", e.message);
  } */
}

export function* watchResendOTP() {
  yield takeLatest(ActionTypes.RESEND_OTP, resendOTP);
}

function* registerUser(action) {
  const uri = 'api/auth/register';
  try {
    const response = yield httpService.postWithoutToken(uri, action.payload);
    if (response.status === 'Ok') {
      yield put({
        type: 'DO_REGISTER_SUCCESS',
        payload: true,
      });
      Alert.alert('Thông báo', 'Đăng ký thành công', [
        {
          text: 'Quay về Đăng nhập',
          onPress: () => NavigateService.navigate('Login'),
        },
      ]);
    } else {
      yield put({
        type: 'DO_REGISTER_ERROR',
        payload: {
          success: false,
          error: response.reason,
        },
      });
      Alert.alert('Thông báo', response.reason);
    }
  } catch (e) {
    console.log({e});
  }
}

export function* watchRegisterUser() {
  yield takeEvery('DO_REGISTER', registerUser);
}
