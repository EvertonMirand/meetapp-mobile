import {
  MEETUP_SUBSCRIBE_REQUEST,
  MEETUP_SUBSCRIBE_SUCCESS,
  MEETUP_SUBSCRIBE_FAILURE,
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
