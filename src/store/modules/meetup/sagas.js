import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';
import api from '~/services/api';
import { subscribeFailure, subscribeSuccess } from './actions';
import { MEETUP_SUBSCRIBE_REQUEST } from './types';

export function* subscribeToMeetup({ payload }) {
  try {
    const { id } = payload;
    yield call(api.post, `meetups/${id}/subscriptions`);

    Alert.alert('Inscrito!', 'Você se inscrvel no MeetUp com sucesso');

    yield put(subscribeSuccess());
  } catch (err) {
    Alert.alert(
      'Falha ao se inscrever!',
      'Houve uma falha ao se inscrever no MeetUp'
    );
    yield put(subscribeFailure());
  }
}

export default all([takeLatest(MEETUP_SUBSCRIBE_REQUEST, subscribeToMeetup)]);
