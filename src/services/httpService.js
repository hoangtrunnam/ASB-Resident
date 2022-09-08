import {CONST} from '../constant/const';
import AsyncStorage from '@react-native-community/async-storage';
import {getSessionKey} from '../core/utils';
export const httpService = {
  get: async url => {
    const token = await getSessionKey();
    const options = {
      method: 'get',
      headers: {
        Accept: 'Application/json',
        'Content-type': 'Application/json',
        Authorization: 'Bearer ' + token,
      },
    };
    return fetch(url, options).then(res => res.json());
  },
  getWithoutToken: async uri => {
    const url = `${CONST.BASE_URL}${uri}`;
    const options = {
      method: 'get',
      headers: {
        Accept: 'Application/json',
        'Content-type': 'Application/json',
      },
    };
    return fetch(url, options).then(res => res.json());
  },
  post: async (uri, data) => {
    const token = await getSessionKey();
    const url = `${CONST.BASE_URL}${uri}`;
    const options = {
      method: 'POST',
      headers: {
        Accept: 'Application/json',
        'Content-type': 'Application/json',
        Authorization: 'Base ' + token,
      },
      body: JSON.stringify(data),
    };
    return fetch(url, options).then(res => res.json());
  },
  postWithToken: async (url, token, data) => {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'Application/json',
        'Content-type': 'Application/json',
        Authorization: 'Base ' + token,
      },
      body: JSON.stringify(data),
    };
    return fetch(url, options).then(res => res.json());
  },
  postWithoutToken: async (uri, data) => {
    const url = `${CONST.BASE_URL}${uri}`;
    const options = {
      method: 'POST',
      headers: {
        Accept: 'Application/json',
        'Content-type': 'Application/json',
      },
      body: JSON.stringify(data),
    };
    return fetch(url, options).then(res => res.json());
  },

  uploadFile: async (url, data) => {
    const token = await getSessionKey();
    let options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Accept: 'Application/json',
        'Content-type': 'Application/json',
        Authorization: 'Base ' + token,
      },
    };
    return fetch(url, options).then(res => res.json());
  },
};
