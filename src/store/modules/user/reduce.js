import produce from 'immer';
import { SIGN_IN_SUCCESS, SIGN_OUT } from '../auth/types';
import { UPDATE_PROFILE_SUCCESS } from './types';

const INITIAL_STATE = {
  profile: null,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case SIGN_IN_SUCCESS: {
        draft.profile = action.payload.user;
        break;
      }
      case UPDATE_PROFILE_SUCCESS: {
        draft.profile = action.payload.profile;
        break;
      }
      case SIGN_OUT: {
        draft.profile = null;
        break;
      }
      default:
    }
  });
}
