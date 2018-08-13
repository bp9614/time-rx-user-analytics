import _ from 'lodash';

import * as actionTypes from '../actions/action_types';

export default function (state = {authenticated: false}, action) {
  switch (action.type) {
    case actionTypes.CREATE_ACCOUNT:
    case actionTypes.FORGOT_PASSWORD:
      state = {
        ...state,
        username: action.payload,
      };
      break;
    case actionTypes.CONFIRM_FORGOT_PASSWORD:
    case actionTypes.CONFIRM_CREATE_ACCOUNT:
      state = _.omit(state, ['username']);
      break;
    case actionTypes.AUTHENTICATED:
      state = {
        ...state,
        authenticated: true,
        currentUser: action.payload,
      }
      break;
    case actionTypes.LOGOUT:
      state = {
        ...state, 
        authenticated: false,
      };
      break;
    default:
  }

  return state;
}