import {httpService} from '../../services/httpService';
import {API} from '../../services/APIs';
import {put, takeLatest} from 'redux-saga/effects';
import {ActionTypes, actions} from './action';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {CONST} from '../../constant/const';
import * as NavigateService from '../../navigation/navigateService';

import {executeMaintain} from '../../core/services';

function* ratingApp(action) {
  try {
    const response = yield httpService.post(API.RATING_APP, action.payload);
    // console.log({responseRate: response});
    if (response.status || response.code === 2) {
      yield AsyncStorage.setItem(CONST.RATING_APP, CONST.RATED);
      yield put(actions.checkIsRatingApp(true));
    }
    Alert.alert('Thông báo', response.message);
  } catch (e) {
    yield put(actions.ratingAppError(e.message));
    console.log({e});
  }
}

export function* watchRatingApp() {
  yield takeLatest(ActionTypes.RATING_APP, ratingApp);
}

function* changePassword(action) {
  try {
    let response = yield executeMaintain(
      {
        ModuleID: 'CPASS',
        SubModule: 'MED',
      },
      action.payload,
    );
    if (response.status === 'Ok') {
      Alert.alert('Thông báo', 'Cập nhật dữ liệu thành công');
      // setKeyChain if config face_id enable
    } else if (response.message === '200918') {
      Alert.alert('Thông báo', 'Mật khẩu cũ không khớp');
    } else {
      Alert.alert('Mật khẩu thay đổi không thành công!');
    }
  } catch (e) {
    Alert.alert('Thông báo', 'Mật khẩu thay đổi không thành công!');
    console.log({e});
  }
}

export function* watchChangePassword() {
  yield takeLatest(ActionTypes.CHANGE_PASSWORD, changePassword);
}
