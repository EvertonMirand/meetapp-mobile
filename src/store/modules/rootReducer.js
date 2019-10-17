import { combineReducers } from 'redux';

import auth from './auth/reduce';
import user from './user/reduce';
import meetup from './meetup/reducer';

export default combineReducers({
  auth,
  user,
  meetup,
});
