import { Alert } from 'react-native';

import { all, takeLatest, call, put } from 'redux-saga/effects';
import { updateProfileFailure, updateProfileSuccess } from './actions';
import api from '~/services/api';
import { UPDATE_PROFILE_REQUEST } from './types';

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;

    const profile = {
      name,
      email,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, 'users', profile);

    Alert.alert('Sucesso!', 'Perfil atualizado com sucesso');

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    Alert.alert(
      'Falha na atualização',
      'Houve um erro na atualização verifique os seus dados'
    );

    yield put(updateProfileFailure());
  }
}

export default all([takeLatest(UPDATE_PROFILE_REQUEST, updateProfile)]);
