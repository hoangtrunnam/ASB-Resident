export const ActionTypes = {
    REFRESING: 'REFRESING',
    REFRESING_DONE: 'REFRESING_DONE',

    GET_BANNERS: 'GET_BANNERS',
    GET_BANNERS_SUCCESS: 'GET_BANNERS_SUCCESS',
    GET_BANNERS_ERROR: 'GET_BANNERS_ERROR',

    //get contact
    GET_CONTACT: 'GET_CONTACT',
    GET_CONTACT_SUCCESS: 'GET_CONTACT_SUCCESS',
    GET_CONTACT_ERROR: 'GET_CONTACT_ERROR',

    //get news
    GET_NEWS: 'GET_NEWS',
    GET_NEWS_SUCCESS: 'GET_NEWS_SUCCESS',
    GET_NEWS_ERROR: 'GET_NEWS_ERROR',
    GET_NEWS_CATE: 'GET_NEWS_CATE',
    GET_NEWS_CATE_SUCCESS: 'GET_NEWS_CATE_SUCCESS',
    GET_NEWS_CATE_ERROR: 'GET_NEWS_CATE_ERROR',
};
export const actions = {
    onRefresing: function(data) {
        return{
            type: ActionTypes.REFRESING,
        }
    },
    onRefresingDone: function(data) {
        return{
            type: ActionTypes.REFRESING_DONE,
        }
    },
    getBanners: function(data) {
        return{
            type: ActionTypes.GET_BANNERS,
            payload: data
        }
    },
    getBanners: function(data) {
        return{
            type: ActionTypes.GET_BANNERS,
            payload: data
        }
    },
    getBannersSuccess: function(success) {
        return{
            type: ActionTypes.GET_BANNERS_SUCCESS,
            payload: success
        }
    },
    getBannersError: function(error) {
        return{
            type: ActionTypes.GET_BANNERS_ERROR,
            payload: error
        }
    },
    getContact: function(data) {
        return{
            type: ActionTypes.GET_CONTACT,
            payload: data
        }
    },
    getContactSuccess: function(success) {
        return{
            type: ActionTypes.GET_CONTACT_SUCCESS,
            payload: success
        }
    },
    getContactError: function(error) {
        return{
            type: ActionTypes.GET_CONTACT_ERROR,
            payload: error
        }
    },
    getNews: function(payload) {
        return{
            type: ActionTypes.GET_NEWS,
            payload
        }
    },
    getNewsSuccess: function(data) {
        return{
            type: ActionTypes.GET_NEWS_SUCCESS,
            payload: data
        }
    },
    getNewsError: function(error) {
        return{
            type: ActionTypes.GET_NEWS_ERROR,
            payload: error
        }
    },
    getNewsCate: function(payload) {
        return{
            type: ActionTypes.GET_NEWS_CATE,
            payload
        }
    },
    getNewsCateSuccess: function(data) {
        return{
            type: ActionTypes.GET_NEWS_CATE_SUCCESS,
            payload: data
        }
    },
    getNewsCateError: function(error) {
        return{
            type: ActionTypes.GET_NEWS_CATE_ERROR,
            payload: error
        }
    },

};
