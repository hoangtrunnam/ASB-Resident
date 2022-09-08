export const ActionTypes = {
    GET_NOTIFICATION: 'GET_NOTIFICATION',
    GET_NOTIFICATION_SUCCESS: 'GET_NOTIFICATION_SUCCESS',
    GET_NOTIFICATION_ERROR: 'GET_NOTIFICATION_ERROR',
};

export const actions = {
    getNotification: function (data) {
        // console.log({data});
        return{
            type: ActionTypes.GET_NOTIFICATION,
            payload: data
        }
    },
    getNotificationSuccess: function (data) {
        return{
            type: ActionTypes.GET_NOTIFICATION_SUCCESS,
            payload: data
        }
    },
    getNotificationError: function (data) {
        return{
            type: ActionTypes.GET_NOTIFICATION_ERROR,
            payload: data
        }
    },
};
