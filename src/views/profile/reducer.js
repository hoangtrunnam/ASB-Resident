import { ActionTypes } from "./action";

const DEFAULT_STATE = {
  message: "",
  is_rated: false
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ActionTypes.IS_RATING_APP:
      return {
        ...state,
        is_rated: action.payload
      };
    case ActionTypes.RATING_APP_SUCCESS:
      return {
        ...state,
        message: action.payload,
        is_rated: true
      };
    default:
      return state;
  }
};
