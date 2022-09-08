export const ActionTypes = {
    RATING_APP: 'RATING_APP',
    RATING_APP_SUCCESS: 'RATING_APP_SUCCESS',
    RATING_APP_ERROR: 'RATING_APP_ERROR',
    IS_RATING_APP: 'IS_RATING_APP',

    CHANGE_PASSWORD: 'CHANGE_PASSWORD',
    CHANGE_PASSWORD_SUCCESS: 'CHANGE_PASSWORD_SUCCESS',
    CHANGE_PASSWORD_ERROR: 'CHANGE_PASSWORD_ERROR',
};

export const actions = {
    ratingApp: function(payload){
        return{
            type: ActionTypes.RATING_APP,
            payload
        }
    },
    ratingAppSuccess: function(data){
        return{
            type: ActionTypes.RATING_APP_SUCCESS,
            payload: data
        }
    },
    ratingAppError: function(error){
        return{
            type: ActionTypes.RATING_APP_ERROR,
            payload:error
        }
    },
    checkIsRatingApp: function (payload) {
        return{
            type: ActionTypes.IS_RATING_APP,
            payload
        }
    },
    changePassword: function (payload) {
        return{
            type: ActionTypes.CHANGE_PASSWORD,
            payload
        }
    },
    changePasswordSuccess: function (data) {
        return{
            type: ActionTypes.CHANGE_PASSWORD_SUCCESS,
            payload: data
        }
    },
    changePasswordError: function (error) {
        return{
            type: ActionTypes.CHANGE_PASSWORD_ERROR,
            payload: error
        }
    },
};
