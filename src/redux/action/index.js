export const ActionTypes = {
    //get cache code
    GET_CACHE_CODE: 'GET_CACHE_CODE',
    GET_CACHE_CODE_SUCCESS: 'GET_CACHE_CODE_SUCCESS',
    GET_CACHE_CODE_ERROR: 'GET_CACHE_CODE_ERROR',

    //get cache language
    GET_CACHE_LANGUAGE: 'GET_CACHE_LANGUAGE',
    GET_CACHE_LANGUAGE_SUCCESS: 'GET_CACHE_LANGUAGE_SUCCESS',
    GET_CACHE_LANGUAGE_ERROR: 'GET_CACHE_LANGUAGE_ERROR',
};

export const actions = {
    getCacheCode: function () {
        return{
            type: ActionTypes.GET_CACHE_CODE,
        }
    },
    getCacheCodeSuccess: function (data) {
        return{
            type: ActionTypes.GET_CACHE_CODE_SUCCESS,
            payload: data
        }
    },
    getCacheCodeError: function (data) {
        return{
            type: ActionTypes.GET_CACHE_CODE_ERROR,
            payload: data
        }
    },
    getCacheLanguage: function (data) {
        return{
            type: ActionTypes.GET_CACHE_LANGUAGE,
            payload: data
        }
    },
    getCacheLanguageSuccess: function (data) {
        return{
            type: ActionTypes.GET_CACHE_LANGUAGE_SUCCESS,
            payload: data
        }
    },
    getCacheLanguageError: function (data) {
        return{
            type: ActionTypes.GET_CACHE_LANGUAGE_ERROR,
            payload: data
        }
    },
};
