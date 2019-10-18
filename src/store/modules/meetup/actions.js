import {
  MEETUP_SUBSCRIBE_REQUEST,
  MEETUP_SUBSCRIBE_SUCCESS,
  MEETUP_SUBSCRIBE_FAILURE,
  MEETUP_UNSUBSCRIBE_REQUEST,
  MEETUP_UNSUBSCRIBE_SUCCESS,
  MEETUP_UNSUBSCRIBE_FAILURE,
} from './types';

export function subscribeRequest(id) {
  return {
    type: MEETUP_SUBSCRIBE_REQUEST,
    payload: {
      id,
    },
  };
}

export function subscribeSuccess() {
  return {
    type: MEETUP_SUBSCRIBE_SUCCESS,
  };
}

export function subscribeFailure() {
  return {
    type: MEETUP_SUBSCRIBE_FAILURE,
  };
}

export function unsubscribeRequest(id) {
  return {
    type: MEETUP_UNSUBSCRIBE_REQUEST,
    payload: {
      id,
    },
  };
}

export function unsubscribeSuccess() {
  return {
    type: MEETUP_UNSUBSCRIBE_SUCCESS,
  };
}

export function unsubscribeFailure() {
  return {
    type: MEETUP_UNSUBSCRIBE_FAILURE,
  };
}
