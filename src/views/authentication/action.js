export const ActionTypes = {
  CHANGE_USER_TYPE: 'CHANGE_USER_TYPE',
  //register phone number
  RESIDENT_REGISTER: 'RESIDENT_REGISTER',
  RESIDENT_REGISTER_SUCCESS: 'RESIDENT_REGISTER_SUCCESS',
  RESIDENT_REGISTER_ERROR: 'RESIDENT_REGISTER_ERROR',

  //register phone number
  RENTER_REGISTER: 'RENTER_REGISTER',
  RENTER_REGISTER_SUCCESS: 'RENTER_REGISTER_SUCCESS',
  RENTER_REGISTER_ERROR: 'RENTER_REGISTER_ERROR',

  //verifyOTP
  VERIFY_OTP: 'VERIFY_OTP',
  VERIFY_OTP_SUCCESS: 'VERIFY_OTP_SUCCESS',
  VERIFY_OTP_ERROR: 'VERIFY_OTP_ERROR',

  //set password
  SET_PASSWORD: 'SET_PASSWORD',
  SET_PASSWORD_SUCCESS: 'SET_PASSWORD_SUCCESS',
  SET_PASSWORD_ERROR: 'SET_PASSWORD_ERROR',

  //login
  LOGIN: 'LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',

  //get project
  GET_PROJECT: 'GET_PROJECT',
  GET_PROJECT_SUCCESS: 'GET_PROJECT_SUCCESS',
  GET_PROJECT_ERROR: 'GET_PROJECT_ERROR',

  //get building
  GET_BUILDING_BY_PROJECT_ID: 'GET_BUILDING_BY_PROJECT_ID',
  GET_BUILDING_BY_PROJECT_ID_SUCCESS: 'GET_BUILDING_BY_PROJECT_ID_SUCCESS',
  GET_BUILDING_BY_PROJECT_ID_ERROR: 'GET_BUILDING_BY_PROJECT_ID_ERROR',

  //get floors
  GET_FLOORS: 'GET_FLOORS',
  GET_FLOORS_SUCCESS: 'GET_FLOORS_SUCCESS',
  GET_FLOORS_ERROR: 'GET_FLOORS_ERROR',

  //get apartment
  GET_APARTMENT: 'GET_APARTMENT',
  GET_APARTMENT_SUCCESS: 'GET_APARTMENT_SUCCESS',
  GET_APARTMENT_ERROR: 'GET_APARTMENT_ERROR',

  //resend OTP
  RESEND_OTP: 'RESEND_OTP',
  RESEND_OTP_SUCCESS: 'RESEND_OTP_SUCCESS',
  RESEND_OTP_ERROR: 'RESEND_OTP_ERROR',

  CHANGE_APARTMENT_ID: 'CHANGE_APARTMENT_ID',
};

export const actions = {
  changeUserType: function (user_type) {
    return {
      type: ActionTypes.CHANGE_USER_TYPE,
      payload: user_type,
    };
  },
  residentRegister: function (phoneNumber) {
    return {
      type: ActionTypes.RESIDENT_REGISTER,
      payload: phoneNumber,
    };
  },
  residentRegisterSuccess: function (success) {
    return {
      type: ActionTypes.RESIDENT_REGISTER_SUCCESS,
      payload: success,
    };
  },
  residentRegisterError: function (error) {
    return {
      type: ActionTypes.RESIDENT_REGISTER_ERROR,
      payload: error,
    };
  },
  verifyOTP: function (data, user_type) {
    return {
      type: ActionTypes.VERIFY_OTP,
      payload: {data, user_type},
    };
  },
  verifyOTPSuccess: function (success) {
    return {
      type: ActionTypes.VERIFY_OTP_SUCCESS,
      payload: success,
    };
  },
  verifyOTPError: function (error) {
    return {
      type: ActionTypes.VERIFY_OTP_ERROR,
      payload: error,
    };
  },
  setPassword: function (data) {
    return {
      type: ActionTypes.SET_PASSWORD,
      payload: data,
    };
  },
  setPasswordSuccess: function (success) {
    return {
      type: ActionTypes.SET_PASSWORD_SUCCESS,
      payload: success,
    };
  },
  setPasswordError: function (error) {
    return {
      type: ActionTypes.SET_PASSWORD,
      payload: error,
    };
  },
  login: function (data) {
    return {
      type: ActionTypes.LOGIN,
      payload: data,
    };
  },
  loginSuccess: function (success) {
    return {
      type: ActionTypes.LOGIN,
      payload: success,
    };
  },
  loginError: function (error) {
    return {
      type: ActionTypes.LOGIN,
      payload: error,
    };
  },
  renterRegister: function (data) {
    return {
      type: ActionTypes.RENTER_REGISTER,
      payload: data,
    };
  },
  renterRegisterSuccess: function (success) {
    return {
      type: ActionTypes.RENTER_REGISTER_SUCCESS,
      payload: success,
    };
  },
  renterRegisterError: function (error) {
    return {
      type: ActionTypes.RENTER_REGISTER_ERROR,
      payload: error,
    };
  },
  getProject: function (data) {
    return {
      type: ActionTypes.GET_PROJECT,
      payload: data,
    };
  },
  getProjectSuccess: function (success) {
    return {
      type: ActionTypes.GET_PROJECT_SUCCESS,
      payload: success,
    };
  },
  getProjectError: function (error) {
    return {
      type: ActionTypes.GET_PROJECT_ERROR,
      payload: error,
    };
  },

  getBuilding: function (data) {
    return {
      type: ActionTypes.GET_BUILDING_BY_PROJECT_ID,
      payload: data,
    };
  },
  getBuildingSuccess: function (success) {
    return {
      type: ActionTypes.GET_BUILDING_BY_PROJECT_ID_SUCCESS,
      payload: success,
    };
  },
  getBuildingError: function (error) {
    return {
      type: ActionTypes.GET_BUILDING_BY_PROJECT_ID_ERROR,
      payload: error,
    };
  },

  getFloors: function (data) {
    return {
      type: ActionTypes.GET_FLOORS,
      payload: data,
    };
  },
  getFloorsSuccess: function (success) {
    return {
      type: ActionTypes.GET_FLOORS_SUCCESS,
      payload: success,
    };
  },
  getFloorsError: function (error) {
    return {
      type: ActionTypes.GET_FLOORS_ERROR,
      payload: error,
    };
  },

  getApartment: function (data) {
    return {
      type: ActionTypes.GET_APARTMENT,
      payload: data,
    };
  },
  getApartmentSuccess: function (success) {
    return {
      type: ActionTypes.GET_APARTMENT_SUCCESS,
      payload: success,
    };
  },
  getApartmentError: function (error) {
    return {
      type: ActionTypes.GET_APARTMENT_ERROR,
      payload: error,
    };
  },
  resendOTP: function (data) {
    return {
      type: ActionTypes.RESEND_OTP,
      payload: data,
    };
  },
  resendOTPSuccess: function (data) {
    return {
      type: ActionTypes.RESEND_OTP_SUCCESS,
      payload: data,
    };
  },
  resendOTPError: function (error) {
    return {
      type: ActionTypes.RESEND_OTP_ERROR,
      payload: error,
    };
  },
  changeApartmentId: function (apartmentId) {
    return {
      type: ActionTypes.CHANGE_APARTMENT_ID,
      payload: apartmentId,
    };
  },
  doRegister: function (data) {
    return {
      type: 'DO_REGISTER',
      payload: data,
    };
  },
};
