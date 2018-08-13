import Amplify from 'aws-amplify';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import AnalyticsPage from './components/analytics_page';
import CreateAccountPage from './components/create_account_page';
import ConfirmAccountPage from './components/confirm_account_page';
import AccountConfirmationPage from './components/account_confirmation_page';
import ResetPasswordPage from './components/reset_password_page';
import ConfirmPasswordPage from './components/confirm_password_page';
import PasswordHasBeenResetPage from './components/password_has_been_reset_page';
import LoginPage from './components/login_page';
import config from './config';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';
import RequireAuth from './components/require_auth';
import 'semantic-ui-css/semantic.min.css';
import './index.css';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
});

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/analytics" component={RequireAuth(AnalyticsPage)} />
          <Route path="/password_has_reset" component={PasswordHasBeenResetPage} />
          <Route path="/password_change" component={ConfirmPasswordPage} />
          <Route path="/password_reset" component={ResetPasswordPage} />
          <Route path="/create_account_confirmation" component={AccountConfirmationPage} />
          <Route path="/create_account_confirm" component={ConfirmAccountPage} />
          <Route path="/create_account" component={CreateAccountPage} />
          <Route path="/" component={LoginPage} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));

registerServiceWorker();