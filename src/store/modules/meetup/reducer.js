import produce from 'immer';
import { SIGN_OUT } from '../auth/types';

export default function meetup(state, action) {
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
