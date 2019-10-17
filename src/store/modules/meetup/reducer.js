import produce from 'immer';
import { SIGN_OUT } from '../auth/types';

const INITIAL_STATE = {
  meetups: undefined,
};

export default function meetup(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case SIGN_OUT: {
        draft.meetups = undefined;
        break;
      }
      default:
    }
  });
}
