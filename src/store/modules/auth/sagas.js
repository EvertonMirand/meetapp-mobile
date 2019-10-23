import { showMessage } from 'react-native-flash-message';
import { takeLatest, call, put, all } from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist/es/constants';
import api from '~/services/api';
import { signInSucess, signFailure } from './action';
import { SIGN_IN_REQUEST, SIGN_UP_REQUEST } from './types';
import { generateErrorMessage } from '~/services/errors';

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
    showMessage({
      message: 'Falha na autentificação',
      description: generateErrorMessage(err),
      type: 'danger',
    });

    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password, onSucess } = payload;
    yield call(api.post, 'users', {
      name,
      email,
      password,
    });

    showMessage({
      message: 'Sucesso!',
      description: 'Dados cadastrados com sucesso.',
      type: 'success',
    });
    onSucess();
  } catch (err) {
    showMessage({
      message: 'Falha no cadastro',
      description: generateErrorMessage(err),
      type: 'danger',
    });

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
  takeLatest(SIGN_UP_REQUEST, signUp),
]);
