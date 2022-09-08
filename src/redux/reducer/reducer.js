import {ActionTypes} from '../action';

const DEFAULT_STATE = {
    codes: [],
    language: []
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case ActionTypes.GET_CACHE_CODE_SUCCESS:
            return{
                ...state,
                codes: action.payload
            };
        case ActionTypes.GET_CACHE_LANGUAGE_SUCCESS:
            return{
                ...state,
                language: action.payload
            };
        default:
            return state;
    }
}
