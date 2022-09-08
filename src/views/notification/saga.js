import { httpService } from '../../services/httpService';
import { API } from '../../services/APIs';
import { put, takeLatest } from 'redux-saga/effects';
import { actions, ActionTypes } from './action';

function* getNotification(action) {
    try {
        yield put(actions.getNotificationSuccess(action.payload))
    } catch (e) {
        console.log({ e })
    }
}

export function* watchGetNotification() {
    yield takeLatest(ActionTypes.GET_NOTIFICATION, getNotification)
}
