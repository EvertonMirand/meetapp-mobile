import { showMessage } from 'react-native-flash-message';
import { all, takeLatest, call, put } from 'redux-saga/effects';
import { updateProfileFailure, updateProfileSuccess } from './actions';
import api from '~/services/api';
import { UPDATE_PROFILE_REQUEST } from './types';
import { generateErrorMessage } from '~/services/errors';

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;

    const profile = {
      name,
      email,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, 'users', profile);

    showMessage({
      message: 'Sucesso!',
      description: 'Perfil atualizado com sucesso.',
      type: 'success',
    });

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    showMessage({
      message: 'Falha na atualização!',
      description: generateErrorMessage(err),
      type: 'danger',
    });

    yield put(updateProfileFailure());
  }
}

export default all([takeLatest(UPDATE_PROFILE_REQUEST, updateProfile)]);
