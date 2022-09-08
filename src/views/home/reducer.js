import {ActionTypes} from './action';

const DEFAULT_STATE = {
  banners: [],
  contacts: [],
  refreshing: false,
  news: [],
  newsCate: [],
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ActionTypes.REFRESING:
      return {
        ...state,
        refreshing: true,
      };
    case ActionTypes.REFRESING_DONE:
      return {
        ...state,
        refreshing: false,
      };
    case ActionTypes.GET_BANNERS:
      return {
        ...state,
        refreshing: true,
      };
    case ActionTypes.GET_BANNERS_SUCCESS:
      return {
        ...state,
        banners: action.payload,
        refreshing: false,
      };
    case ActionTypes.GET_CONTACT_SUCCESS:
      return {
        ...state,
        contacts: action.payload,
      };
    case ActionTypes.GET_NEWS_SUCCESS:
      return {
        ...state,
        news: action.payload,
      };
    case ActionTypes.GET_NEWS_CATE_SUCCESS:
      return {
        ...state,
        newsCate: action.payload,
      };
    default:
      return state;
  }
};
