import { showMessage } from 'react-native-flash-message';
import { takeLatest, call, put, all } from 'redux-saga/effects';
import api from '~/services/api';
import { generateErrorMessage } from '~/services/errors';
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

    showMessage({
      message: 'Inscrito!',
      description: 'Você se inscreveu no MeetUp com sucesso.',
      type: 'success',
    });

    yield put(subscribeSuccess());
  } catch (err) {
    showMessage({
      message: 'Falha ao se inscrever!',
      description: generateErrorMessage(err),
      type: 'danger',
    });
    yield put(subscribeFailure());
  }
}

export function* unsubscribeToMeetup({ payload }) {
  try {
    const { id } = payload;
    yield call(api.delete, `subscriptions/${id}`);

    showMessage({
      message: 'Desinscrito!',
      description: 'Você se desinscreveu no MeetUp com sucesso.',
      type: 'success',
    });

    yield put(unsubscribeSuccess());
  } catch (err) {
    showMessage({
      message: 'Falha ao se desinscrever!',
      description: generateErrorMessage(err),
      type: 'danger',
    });

    yield put(unsubscribeFailure());
  }
}

export default all([
  takeLatest(MEETUP_SUBSCRIBE_REQUEST, subscribeToMeetup),
  takeLatest(MEETUP_UNSUBSCRIBE_REQUEST, unsubscribeToMeetup),
]);
