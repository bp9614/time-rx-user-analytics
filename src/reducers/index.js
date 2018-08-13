import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import awsReducer from './aws_reducer';
import loadingReducer from './loading_reducer';
import modalReducer from './modal_reducer';
import queryReducer from './query_reducer';

const rootReducer = combineReducers({
  aws: awsReducer,
  form: formReducer,
  loading: loadingReducer,
  modal: modalReducer,
  query: queryReducer,
});

export default rootReducer;