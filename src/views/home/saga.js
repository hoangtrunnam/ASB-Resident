import { takeLatest, put } from "redux-saga/effects";
import { actions, ActionTypes } from "./action";
import { httpService } from "../../services/httpService";
import { API } from "../../services/APIs";
import * as NavigationService from "../../navigation/navigateService";
import AsyncStorage from "@react-native-community/async-storage";

import { CONST } from "../../constant/const";

function* getBanners(action) {
  try {
    yield put(actions.getBannersSuccess(action.payload));
  } catch (e) {
    console.log({ e });
    AsyncStorage.removeItem(CONST.TOKEN, () => {
      NavigationService.navigate("Login");
    });
  }
}

export function* watchGetBanners() {
  yield takeLatest(ActionTypes.GET_BANNERS, getBanners);
}

function* getContact(action) {
  try {
    // const response = yield httpService.post(API.GET_CONTACT, action.payload);
    // console.log({response});
    // if (response.code === 1) {
    yield put(actions.getContactSuccess(action.payload));
    // }
  } catch (e) {
    console.log({ e });
    AsyncStorage.removeItem(CONST.TOKEN, () => {
      NavigationService.navigate("Login");
    });
  }
}

export function* watchGetContact() {
  yield takeLatest(ActionTypes.GET_CONTACT, getContact);
}

function* getNews(action) {
  try {
    yield put(actions.getNewsSuccess(action.payload));
  } catch (e) {
    console.log({ e });
  }
}

export function* watchGetNews() {
  yield takeLatest(ActionTypes.GET_NEWS, getNews);
}

function* getNewsCate(action) {
  try {
    yield put(actions.getNewsCateSuccess(action.payload));
  } catch (e) {
    console.log({ e });
  }
}

export function* watchGetNewsCate() {
  yield takeLatest(ActionTypes.GET_NEWS_CATE, getNewsCate);
}
