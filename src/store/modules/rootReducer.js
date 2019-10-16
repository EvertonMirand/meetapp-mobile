import { combineReducers } from 'redux';

import auth from './auth/reduce';
import user from './user/reduce';

export default combineReducers({
  auth,
  user,
});
