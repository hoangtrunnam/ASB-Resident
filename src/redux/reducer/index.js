import {combineReducers} from 'redux';
import AuthReducer from '../../views/authentication/reducer';
import HomeReducer from '../../views/home/reducer';
import RequestReducer from '../../views/requirement/reducer';
import AppReducer from './reducer';
import NotificationReducer from '../../views/notification/reducer';
import ProfileReducer from '../../views/profile/reducer';

export default combineReducers({
    AuthReducer,
    HomeReducer,
    RequestReducer,
    AppReducer,
    NotificationReducer,
    ProfileReducer,
})
