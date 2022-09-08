export const ActionTypes = {
    //get requirement
    GET_REQUEST: 'GET_REQUEST',
    GET_REQUEST_SUCCESS: 'GET_REQUEST_SUCCESS',
    GET_REQUEST_ERROR: 'GET_REQUEST_ERROR',
    //add requirement
    ADD_REQUEST: 'ADD_REQUEST',
    ADD_REQUEST_SUCCESS: 'ADD_REQUEST_SUCCESS',
    ADD_REQUEST_ERROR: 'ADD_REQUEST_ERROR',

    UPLOAD_IMAGES: 'UPLOAD_IMAGES',
    UPLOAD_IMAGES_SUCCESS: 'UPLOAD_IMAGES_SUCCESS',
    UPLOAD_IMAGES_ERROR: 'UPLOAD_IMAGES_ERROR',

    GET_USER_APARTMENT: 'GET_USER_APARTMENT',
    GET_USER_APARTMENT_SUCCESS: 'GET_USER_APARTMENT_SUCCESS',
    GET_USER_APARTMENT_ERROR: 'GET_USER_APARTMENT_ERROR',

    GET_REQUEST_REP: 'GET_REQUEST_REP',
    GET_REQUEST_REP_SUCCESS: 'GET_REQUEST_REP_SUCCESS',
    GET_REQUEST_REP_ERROR: 'GET_REQUEST_REP_ERROR',

    ADD_REPLY: 'ADD_REPLY',
    ADD_REPLY_SUCCESS: 'ADD_REPLY_SUCCESS',
    ADD_REPLY_ERROR: 'ADD_REPLY_ERROR',

    DELETE_IMAGE: 'DELETE_IMAGE',
    DELETE_IMAGE_SUCCESS: 'DELETE_IMAGE_SUCCESS',
    DELETE_IMAGE_ERROR: 'DELETE_IMAGE_ERROR',
};

export const actions = {
    getRequest: function (data) {
        return{
            type: ActionTypes.GET_REQUEST,
            payload: data
        }
    },
    getRequestSuccess: function (data) {
        return{
            type: ActionTypes.GET_REQUEST_SUCCESS,
            payload: data
        }
    },
    getRequestError: function (data) {
        return{
            type: ActionTypes.GET_REQUEST_ERROR,
            payload: data
        }
    },

    addRequest: function (data, getRequest) {
        return{
            type: ActionTypes.ADD_REQUEST,
            payload: data,
            getRequest
        }
    },
    addRequestSuccess: function (data) {
        return{
            type: ActionTypes.ADD_REQUEST_SUCCESS,
            payload: data
        }
    },
    addRequestError: function (data) {
        return{
            type: ActionTypes.ADD_REQUEST_ERROR,
            payload: data
        }
    },
    uploadImages: function(payload) {
        return{
            type: ActionTypes.UPLOAD_IMAGES,
            payload
        }
    },
    uploadImagesSuccess: function(data) {
        return{
            type: ActionTypes.UPLOAD_IMAGES_SUCCESS,
            payload: data
        }
    },
    uploadImagesError: function(error) {
        return{
            type: ActionTypes.UPLOAD_IMAGES_ERROR,
            payload: error
        }
    },
    getUserApartment: function(payload) {
        return{
            type: ActionTypes.GET_USER_APARTMENT,
            payload
        }
    },
    getUserApartmentSuccess: function(data) {
        return{
            type: ActionTypes.GET_USER_APARTMENT_SUCCESS,
            payload: data
        }
    },
    getUserApartmentError: function(error) {
        return{
            type: ActionTypes.GET_USER_APARTMENT_ERROR,
            payload: error
        }
    },
    getRequestRep: function(payload) {
        return{
            type: ActionTypes.GET_REQUEST_REP,
            payload
        }
    },
    getRequestRepSuccess: function(data) {
        return{
            type: ActionTypes.GET_REQUEST_REP_SUCCESS,
            payload: data
        }
    },
    getRequestRepError: function(error) {
        return{
            type: ActionTypes.GET_REQUEST_REP_ERROR,
            payload: error
        }
    },
    addReply: function(payload) {
        return{
            type: ActionTypes.ADD_REPLY,
            payload
        }
    },
    addReplySuccess: function(data) {
        return{
            type: ActionTypes.ADD_REPLY_SUCCESS,
            payload: data
        }
    },
    addReplyError: function(error) {
        return{
            type: ActionTypes.ADD_REPLY_ERROR,
            payload: error
        }
    },
    deleteImage: function(fileName) {
        return{
            type: ActionTypes.DELETE_IMAGE,
            payload: fileName
        }
    },
    deleteImageSuccess: function(data) {
        return{
            type: ActionTypes.DELETE_IMAGE_SUCCESS,
            payload: data
        }
    },
    deleteImageError: function(error) {
        return{
            type: ActionTypes.DELETE_IMAGE_ERROR,
            payload: error
        }
    },

};
