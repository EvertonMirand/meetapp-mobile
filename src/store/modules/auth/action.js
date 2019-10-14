import {
  SIGN_IN_REQUEST,
  SIGN_FAILURE,
  SIGN_OUT,
  SIGN_UP_REQUEST,
  SIGN_IN_SUCCESS,
} from './types';

export function signInRequest(email, password) {
  return {
    type: SIGN_IN_REQUEST,
    payload: {
      email,
      password,
    },
  };
}

export function signInSucess(token, user) {
  return {
    type: SIGN_IN_SUCCESS,
    payload: {
      token,
      user,
    },
  };
}

export function signUpRequest(name, email, password, onSucess) {
  return {
    type: SIGN_UP_REQUEST,
    payload: {
      name,
      email,
      password,
      onSucess,
    },
  };
}

export function signFailure() {
  return {
    type: SIGN_FAILURE,
  };
}

export function signOut() {
  return {
    type: SIGN_OUT,
  };
}
