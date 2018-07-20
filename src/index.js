import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware} from 'redux';
import ReduxPromise from 'redux-promise';

import AnalyticsPage from './components/analytics_page';
import LoginPage from './components/login_page';
import PrivacyPolicyPage from './components/privacy_policy_page';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';
import ResetPassword from './components/reset_password_page';
import UserAgreementPage from './components/user_agreement_page';
import './index.css';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/reset-password" component={ResetPassword}/>
                    <Route path="/analytics" component={AnalyticsPage}/>
                    <Route path="/user-agreement" component={UserAgreementPage}/>
                    <Route path="/privacy-policy" component={PrivacyPolicyPage}/>
                    <Route path="/" component={LoginPage}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));

registerServiceWorker();