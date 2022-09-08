import {TextInput} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import moment from 'moment';
import {StoreKey} from '../constanst';
const {State: TextInputState} = TextInput;

export default function dismissKeyboard() {
  TextInputState.blurTextInput(TextInputState.currentlyFocusedField());
}

export async function getSessionKey() {
  return await AsyncStorage.getItem(StoreKey.SessionKey);
}
export async function getSessionInfo() {
  try {
    return JSON.parse(await AsyncStorage.getItem(StoreKey.Session));
  } catch (error) {
    return {};
  }
}
export function isError(response) {
  return response.status === 'Error';
}

export function formatNumber(num) {
  if (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
  return 0;
}

export function formatDate(date, format = 'DD/MM/YYYY') {
  if (date) {
    return moment(date).format(format);
  }
  return '';
}
export function formatDatePeriod(date) {
  if (date) {
    return moment(date).format('MM/YYYY');
  }
  return '';
}
export const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);
  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    let idx = numberOfElementsLastRow;
    data.push({
      key: `blank-${numberOfElementsLastRow}`,
      empty: true,
      idx: numberOfElementsLastRow,
    });
    numberOfElementsLastRow++;
  }

  return data;
};
