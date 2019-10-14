import produce from 'immer';
import {
  SIGN_IN_SUCCESS,
  SIGN_IN_REQUEST,
  SIGN_FAILURE,
  SIGN_OUT,
  SIGN_UP_SUCESS,
} from './types';

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case SIGN_IN_SUCCESS: {
        draft.token = action.payload.token;
        draft.signed = true;
        draft.loading = false;
        break;
      }

      case SIGN_IN_REQUEST: {
        draft.loading = true;
        break;
      }
      case SIGN_UP_SUCESS: {
        draft.loading = false;
        break;
      }
      case SIGN_FAILURE: {
        draft.loading = false;
        draft.error = true;
        break;
      }
      case SIGN_OUT: {
        draft.token = null;
        draft.signed = false;
        break;
      }
      default:
    }
  });
}
