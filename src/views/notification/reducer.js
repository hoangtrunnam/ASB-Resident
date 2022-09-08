import {ActionTypes} from './action';

const DEFAULT_STATE = {
    notifications: [],
    refreshing: false
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case ActionTypes.GET_NOTIFICATION:
            return{
                ...state,
                refreshing: true
            };
        case ActionTypes.GET_NOTIFICATION_SUCCESS:
            return{
                ...state,
                notifications: action.payload,
                refreshing: false
            };
        default:
            return state;
    }
}
