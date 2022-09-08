import { apiUrl } from "../core/constanst";

const BASE_URL = apiUrl;
const SESSION_API = `${BASE_URL}/session`;
const SEARCH_API = `${BASE_URL}/search`;

export const API = {
  LOGIN: `${SESSION_API}/login`,
  RESIDENT_REGISTER: BASE_URL + "auth/register-resident",
  VERIFY_OTP: BASE_URL + "auth/vertify-otp",
  RESEND_OTP: BASE_URL + "auth/resend-otp",

  SET_PASSWORD: BASE_URL + "auth/register-password",
  RENTER_REGISTER: BASE_URL + "auth/register-renter",

  GET_PROJECT: BASE_URL + "module/execute-module-anonymous",
  GET_BUILDING: BASE_URL + "module/execute-module-anonymous",
  GET_FLOORS: BASE_URL + "module/execute-module-anonymous",
  GET_APARTMENT: BASE_URL + "module/execute-module-anonymous",

  GET_BANNERS: BASE_URL + "module/execute-module",
  GET_CONTACT: BASE_URL + "module/execute-module",

  GET_REQUEST: BASE_URL + "module/execute-module",
  ADD_REQUEST: BASE_URL + "module/execute-module",
  GET_USER_APARTMENT: BASE_URL + "module/execute-module",
  GET_REQUEST_REP: BASE_URL + "module/execute-module",
  ADD_REPLY: BASE_URL + "module/execute-module",
  GET_DETAIL_NOTIFICATION: BASE_URL + "module/execute-module",

  CHANGE_PASSWORD: BASE_URL + "module/execute-module",

  GET_NEWS: BASE_URL + "module/execute-module",
  GET_NEWS_CATE: BASE_URL + "module/execute-module",

  DELETE_IMAGE: BASE_URL + "upload/delete-file",

  RATING_APP: BASE_URL + "module/execute-module",
  UPLOAD_BASE64: BASE_URL + "upload/upload-base64",

  GET_NOTIFICATION: BASE_URL + "module/execute-module",

  GET_CACHE_CODE: BASE_URL + "cache/get-codes",
  GET_CACHE_LANGUAGE: BASE_URL + "api/cache/get-lang",
  ADD_FCM_TOKEN: BASE_URL + 'api/notification/addtoken',
  REMOVE_FCM_TOKEN: 'api/notification/removetoken',
};
