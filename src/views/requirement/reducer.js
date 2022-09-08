import { ActionTypes } from "./action";

const DEFAULT_STATE = {
  request: [],
  refresh: false,
  images_request: [],
  apartments: [],
  replies: [],
  reply: {},
  Content: "",
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ActionTypes.GET_REQUEST:
      return {
        ...state,
        refresh: true,
      };
    case ActionTypes.GET_REQUEST_SUCCESS:
      return {
        ...state,
        request: action.payload,
        refresh: false,
      };
    case ActionTypes.UPLOAD_IMAGES_SUCCESS:
      return {
        ...state,
        images_request: state.images_request.concat(action.payload),
      };
    case ActionTypes.GET_USER_APARTMENT_SUCCESS:
      return {
        ...state,
        apartments: action.payload,
      };
    case ActionTypes.GET_REQUEST_REP_SUCCESS:
      return {
        ...state,
        replies: action.payload,
      };
    case ActionTypes.ADD_REPLY_SUCCESS:
      const data = action.payload;
      return {
        ...state,
        replies: [...state.replies, data],
        images_request: [],
      };
    case "CHANGE_CONTENT":
      return {
        ...state,
        Content: action.payload,
      };
    case ActionTypes.DELETE_IMAGE:
      const new_images_request = state.images_request.filter(
        (e) => e !== action.payload.fileName
      );
      return {
        ...state,
        images_request: new_images_request,
      };
    default:
      return state;
  }
};
