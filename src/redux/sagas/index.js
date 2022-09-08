import {all} from 'redux-saga/effects';
import {
  watchResidentRegister,
  watchSetPassword,
  watchVerifyOTP,
  watchLogin,
  watchRenterRegister,
  watchGetProject,
  watchGetBuildingByProjectId,
  watchGetFloors,
  watchGetApartment,
  watchResendOTP,
  watchRegisterUser,
} from '../../views/authentication/saga';
import {
  watchGetBanners,
  watchGetContact,
  watchGetNews,
  watchGetNewsCate,
} from '../../views/home/saga';
import {
  watchAddReply,
  watchAddRequest,
  watchDeleteImage,
  watchGetRequest,
  watchGetRequestRep,
  watchGetUserApartment,
  watchUploadImages,
} from '../../views/requirement/saga';
import {watchGetCacheCode} from './app-saga';
import {watchGetNotification} from '../../views/notification/saga';
import {watchChangePassword, watchRatingApp} from '../../views/profile/saga';

function* rootSaga() {
  yield all([
    watchResidentRegister(),
    watchVerifyOTP(),
    watchSetPassword(),
    watchLogin(),
    watchRenterRegister(),
    watchGetProject(),
    watchGetBuildingByProjectId(),
    watchGetFloors(),
    watchGetApartment(),
    watchGetBanners(),
    watchGetContact(),
    watchResendOTP(),
    watchGetRequest(),
    watchGetCacheCode(),
    watchGetNotification(),
    watchAddRequest(),
    watchRatingApp(),
    watchUploadImages(),
    watchGetUserApartment(),
    watchGetRequestRep(),
    watchAddReply(),
    watchDeleteImage(),
    watchGetNews(),
    watchGetNewsCate(),
    watchChangePassword(),
    watchRegisterUser(),
  ]);
}
export default rootSaga;
