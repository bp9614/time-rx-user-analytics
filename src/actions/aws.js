import _ from 'lodash';
import axios from 'axios';
import { Auth } from 'aws-amplify';
import config from '../config';
import * as actionTypes from './action_types';
import * as consts from '../consts/index';


export function signIn(username, password, callback) {
  const response = Auth.signIn(username, password);

  return (dispatch) => {
    dispatch({type: actionTypes.LOADING});
    
    response
      .then(() => {
        dispatch({ type: actionTypes.AUTHENTICATED, payload: username });
        callback();
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.SHOW_MODAL,
          payload: 'Incorrect Username or Password',
        });
      })
      .then(() => {
        dispatch({ type: actionTypes.FINISHED });
      }); 
  };
}

export function logout() {
  const response = Auth.signOut();

  return (dispatch) => {
    dispatch({type: actionTypes.LOADING});

    response
      .then(() => {
        dispatch({ type: actionTypes.LOGOUT });
      })
      .catch((error) => {
        dispatch({ type: actionTypes.LOGOUT });
      })
      .then(() => {
        dispatch({ type: actionTypes.FINISHED });
      }); 
  };
}

export function query(details) {
  const response = axios.get(config.apiGateway.ENDPOINT, details);

  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING });

    response
      .then(({data}) => {
        if (_.isEmpty(data)) {
          dispatch({ type: actionTypes.EMPTY_RESPONSE });
        }

        if ('chart' in data) {
          dispatch({ type: actionTypes.HAS_CHART, payload: data });
        }

        if ('history' in data) {
          dispatch({ type: actionTypes.HAS_HISTORY, payload: data});
        }
      })
      .catch((error) => {
        dispatch({ type: actionTypes.EMPTY_RESPONSE });
      });
    }
} 

export function forgotPassword(username, callback) {
  const response = Auth.forgotPassword(username);

  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING });

    response
      .then(() => {
        dispatch({ type: actionTypes.FORGOT_PASSWORD, payload: username });
        callback();
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.SHOW_MODAL,
          payload: 'Username does not exist',
        });
      })
      .then(() => {
        dispatch({ type: actionTypes.FINISHED });
      });
  }
}

export function confirmPassword(username, code, newPassword, callback) {
  const response = Auth.forgotPasswordSubmit(username, code, newPassword);

  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING });

    response
      .then(() => {
        dispatch({ type: actionTypes.CONFIRM_FORGOT_PASSWORD});
        callback();
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.SHOW_MODAL,
          payload: 'Incorrect Code or Password Too Weak',
        });
      })
      .then(() => {
        dispatch({ type: actionTypes.FINISHED });
      });
  };
}

export function createAccount(username, password, email, callback) {
  const response = Auth.signUp({
    username,
    password,
    attributes: {
      email,
    }
  });

  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING });

    response
      .then(() => {
        dispatch({ type: actionTypes.CREATE_ACCOUNT, payload: username });
        callback();
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.SHOW_MODAL,
          payload: 'Username/Email Already Exists',
        });
      })
      .then(() => {
        dispatch({ type: actionTypes.FINISHED });
      });
  }
}

export function confirmAccount(username, code, callback) {
  const response = Auth.confirmSignUp(username, code);

  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING });

    response
      .then(() => {
        dispatch({ type: actionTypes.CONFIRM_CREATE_ACCOUNT});
        callback();
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.SHOW_MODAL,
          payload: 'Incorrect Code'
        });
      })
      .then(() => {
        dispatch({ type: actionTypes.FINISHED });
      });
  };
}