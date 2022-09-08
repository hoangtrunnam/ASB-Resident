import {httpService} from '../../services/httpService';
import {API} from '../../services/APIs';
import {put, takeLatest} from 'redux-saga/effects';
import {actions, ActionTypes} from '../action';
import * as NavigationService from '../../navigation/navigateService'

function* getCacheCode() {
    try {
        const response = yield httpService.get(API.GET_CACHE_CODE);
        if (response.code) {
            yield put(actions.getCacheCodeSuccess(response.data));
        }
    } catch (e) {
        console.log({e});
        NavigationService.navigate('Login')
    }
};

export function* watchGetCacheCode() {
    yield takeLatest(ActionTypes.GET_CACHE_CODE, getCacheCode)
}
