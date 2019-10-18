import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';
import api from '~/services/api';
import {
  subscribeFailure,
  subscribeSuccess,
  unsubscribeFailure,
  unsubscribeSuccess,
} from './actions';
import { MEETUP_SUBSCRIBE_REQUEST, MEETUP_UNSUBSCRIBE_REQUEST } from './types';

export function* subscribeToMeetup({ payload }) {
  try {
    const { id } = payload;
    yield call(api.post, `meetups/${id}/subscriptions`);

    Alert.alert('Inscrito!', 'Você se inscreveu no MeetUp com sucesso');

    yield put(subscribeSuccess());
  } catch (err) {
    console.tron.log(err.response.data.error);
    Alert.alert('Falha ao se inscrever!', err.response.data.error);
    yield put(subscribeFailure());
  }
}

export function* unsubscribeToMeetup({ payload }) {
  try {
    const { id } = payload;
    yield call(api.delete, `subscriptions/${id}`);

    Alert.alert('Desinscrito!', 'Você se desinscreveu no MeetUp com sucesso');

    yield put(unsubscribeSuccess());
  } catch (err) {
    const { error } = err.response.data;
    Alert.alert(
      'Falha ao se desinscrever!',
      error && !error.message ? error : 'Ocorreu um erro ao se desinscrever!'
    );
    yield put(unsubscribeFailure());
  }
}

export default all([
  takeLatest(MEETUP_SUBSCRIBE_REQUEST, subscribeToMeetup),
  takeLatest(MEETUP_UNSUBSCRIBE_REQUEST, unsubscribeToMeetup),
]);
