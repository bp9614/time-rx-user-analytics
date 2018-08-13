import * as actionTypes from '../actions/action_types';

export default function(state={isLoading: false}, action) {
  switch (action.type) {
    case actionTypes.LOADING:
      state = {...state, isLoading: true}
      break;
    case actionTypes.FINISHED:
    case actionTypes.EMPTY_RESPONSE:
    case actionTypes.GET_USERNAME:
    case actionTypes.HAS_CHART:
    case actionTypes.HAS_HISTORY:
      state = {...state, isLoading: false}
      break;
    default:
  }

  return state;
}