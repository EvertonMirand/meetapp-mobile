import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist/es/constants';
import api from '~/services/api';
import { signInSucess, signFailure } from './action';
import { SIGN_IN_REQUEST } from './types';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;
    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });
    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSucess(token, user));
  } catch (err) {
    Alert.alert(
      'Falha na autentificação',
      'Houve um erro no login verifique os seus dados'
    );

    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;
  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest(REHYDRATE, setToken),
  takeLatest(SIGN_IN_REQUEST, signIn),
]);
