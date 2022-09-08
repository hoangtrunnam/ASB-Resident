import { ActionTypes } from "./action";

const DEFAULT_STATE = {
  user_type: "",
  error: null,
  UserName: "",
  appKey: "",
  project: [],
  building: [],
  floors: [],
  apartment: [],
  step: 1,
  apartmentId: null,
  OwnerPhone: null,
  success: null,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_USER_TYPE:
      return {
        ...state,
        user_type: action.payload,
      };
    case ActionTypes.RESIDENT_REGISTER:
      return {
        ...state,
        UserName: action.payload,
      };
    case ActionTypes.RESIDENT_REGISTER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ActionTypes.RESIDENT_REGISTER_SUCCESS:
      return {
        ...state,
        appKey: action.payload,
      };
    case ActionTypes.RENTER_REGISTER_SUCCESS:
      return {
        ...state,
        appKey: action.payload.appKey,
        UserName: action.payload.UserName,
        OwnerPhone: action.payload.OwnerPhone,
      };
    case ActionTypes.GET_PROJECT_SUCCESS:
      return {
        ...state,
        project: action.payload,
      };
    case ActionTypes.GET_BUILDING_BY_PROJECT_ID_SUCCESS:
      return {
        ...state,
        building: action.payload,
        step: 2,
      };
    case "CHANGE_STEP":
      return {
        ...state,
        step: action.payload,
      };
    case ActionTypes.GET_FLOORS_SUCCESS:
      return {
        ...state,
        floors: action.payload,
        step: 3,
      };
    case ActionTypes.GET_APARTMENT_SUCCESS:
      return {
        ...state,
        apartment: action.payload,
        step: 4,
      };
    case ActionTypes.RESEND_OTP:
      return {
        ...state,
        UserName: action.payload.UserName,
      };
    case ActionTypes.RESEND_OTP_SUCCESS:
      return {
        ...state,
        appKey: action.payload.appKey,
      };
    case ActionTypes.CHANGE_APARTMENT_ID:
      return {
        ...state,
        apartmentId: action.payload,
      };
    case 'DO_REGISTER':
      return {
        ...state,
      };
    case 'DO_REGISTER_SUCCESS':
      return {
        ...state,
        success: action.payload,
      };
    case 'DO_REGISTER_ERROR':
      return {
        ...state,
        error: action.payload.error,
        success: action.payload.success,
      };
    default:
      return state;
  }
};
