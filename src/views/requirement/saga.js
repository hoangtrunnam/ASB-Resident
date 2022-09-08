import { put, takeLatest, takeEvery, call } from "redux-saga/effects";
import { actions, ActionTypes } from "./action";
import { httpService } from "../../services/httpService";
import { API } from "../../services/APIs";
import { Alert } from "react-native";
import * as NavigationService from "../../navigation/navigateService";
function* getRequest(action) {
  try {
    yield put(actions.getRequestSuccess(action.payload));
  } catch (e) {
    console.log({ e });
  }
}
export function* watchGetRequest() {
  yield takeLatest(ActionTypes.GET_REQUEST, getRequest);
}
import { executeMaintain } from "../../core/services";
function* getRequestList() {
  try {
    let searchResult = yield searchModule.executeSearch({
      ModuleID: "03507",
      SubModule: "MMN",
    });
    console.log("function*getRequestList -> searchResult", searchResult);
    yield put(actions.getRequestSuccess(searchResult.result.data || []));
  } catch (error) {
    console.warn("function*getRequestList -> error", error);
  }
}

function* addRequest(action) {
  try {
    let kq = yield executeMaintain(
      action.payload.moduleInfo,
      action.payload.values
    );
    console.warn("function*addRequest -> kq", kq);
    if (kq.status === "Ok") {
      yield getRequestList();
      Alert.alert("THÔNG BÁO", "Tạo phản ánh thành công", [
        {
          text: "OK",
          onPress: () => {
            NavigationService.goBack();
          },
        },
      ]);
    }
  } catch (e) {
    console.log({ e });
    Alert.alert("Thông báo", e.message);
  }
}
export function* watchAddRequest() {
  yield takeLatest(ActionTypes.ADD_REQUEST, addRequest);
}

function* uploadImages(action) {
  try {
    const response = yield httpService.uploadFile(
      `${apiUrl}api/mediaupload/upload-base64`,
      action.payload
    );
    console.warn("function*uploadImages -> response", response?.data);
    if (response.status) {
      yield put(actions.uploadImagesSuccess(response.data));
    } else {
      yield put(actions.uploadImagesError(response.message));
    }
  } catch (e) {
    yield put(actions.uploadImagesError(e.message));
  }
}
export function* watchUploadImages() {
  yield takeEvery(ActionTypes.UPLOAD_IMAGES, uploadImages);
}

function* getUserApartment(action) {
  try {
    // console.log({responseApart: response});
    yield put(actions.getUserApartmentSuccess(action.payload));
  } catch (e) {
    console.log({ e });
  }
}
export function* watchGetUserApartment() {
  yield takeEvery(ActionTypes.GET_USER_APARTMENT, getUserApartment);
}
import { executeSearch, executeLoadHandler } from "../../core/services";
import { searchModule } from "../../core/modules/search";
import { apiUrl } from "../../core/constanst";
function* getRequestRep(action) {
  try {
    let response = yield searchModule.executeSearch(
      {
        ModuleID: "03508",
        SubModule: "MMN",
      },
      [
        {
          FieldID: "C01",
          FieldType: "DEC",
          Value: action.payload?.Value,
        },
      ]
    );
    // let response = yield executeSearch(
    //   {
    //     ModuleID: "03508",
    //     SubModule: "MMN",
    //   }
    //   [
    //     {
    //       FieldID: "C01",
    //       FieldType: "DEC",
    //       Value: "1",
    //     },
    //   ]
    // );
    // console.log({responseRep: response});
    if (response) {
      yield put(
        actions.getRequestRepSuccess(response?.result?.data?.reverse() || [])
      );
    } else {
      yield put(actions.getRequestRepSuccess([]));
    }
  } catch (e) {
    console.log({ e });
  }
}
export function* watchGetRequestRep() {
  yield takeEvery(ActionTypes.GET_REQUEST_REP, getRequestRep);
}

function* addReply(action) {
  try {
    let response = yield executeMaintain(
      action.payload.moduleInfo,
      action.payload.values
    );
    let content = action.payload.values[2];
    // const response = yield httpService.post(API.ADD_REPLY, action.payload);
    actions.addReplySuccess({
      CONTENT: content?.Value,
      REPLY_BY: action.payload.REPLY_BY,
    });
    if (response.status === "Ok") {
      if (content?.Value) {
        yield put(
          actions.addReplySuccess({
            CONTENT: content?.Value,
            REPLY_BY: action.payload.REPLY_BY,
            CONTENT_TYPE: action.payload.CONTENT_TYPE,
          })
        );
      }
      yield put({ type: "CHANGE_CONTENT", payload: "" });
    }
  } catch (e) {
    console.log({ e });
  }
}
export function* watchAddReply() {
  yield takeLatest(ActionTypes.ADD_REPLY, addReply);
}

function* deleteImage(action) {
  try {
    // const response = yield httpService.post(API.DELETE_IMAGE, action.payload);
    // console.log("response delete image", response);
    // if (response.status) {
    // yield put(actions.deleteImageSuccess(response.message));
    // }
  } catch (e) {
    console.log({ e });
  }
}
export function* watchDeleteImage() {
  yield takeEvery(ActionTypes.DELETE_IMAGE, deleteImage);
}
