import * as actionTypes from '../actions/action_types';

const defaultState = {
  showModal: false,
  emptyResponseModal: false,
};

export default function(state=defaultState, action) {
  switch (action.type) {
    case actionTypes.SHOW_MODAL:
      state = {
        ...state,
        showModal: true,
        errorMsg: action.payload,
      };
      break;
    case actionTypes.CLOSE_MODAL:
      state = {
        ...state,
        showModal: false,
        emptyResponseModal: false,
      };
      break;
    case actionTypes.EMPTY_RESPONSE:
      state = {
        ...state,
        emptyResponseModal: true,
      }
    default:
  }

  return state;
}