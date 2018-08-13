import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import ErrorMessageModal from './error_message_modal';
import renderField from './render_field';
import { createAccount } from '../actions/aws';
import './landing_page.css';

class CreateAccountPage extends Component {
  onSubmit(values) {
    this.props.createAccount(values.username, values.pw, values.email, () => {
      this.props.history.push('/create_account_confirm')
    })
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <div className="outer">
          <div className="middle">
            <div className="login-page">
              <div className="form">
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                  <Field
                        label="Username" id="username" name="username"
                        type="text" placeholder="Username"
                        className="bootstrap-form-control"
                        component={renderField} />
                  <Field
                      label="Email" id="email" name="email"
                      type="email" placeholder="Email"
                      className="bootstrap-form-control"
                      component={renderField} />
                  <Field
                      label="Password" id="pw" name="pw" type="password"
                      placeholder="Password" className="bootstrap-form-control"
                      component={renderField} />
                  <Field
                      label="Confirm Password" id="confirm_pw"
                      name="confirm_pw" type="password"
                      placeholder="Confirm Password" className="bootstrap-form-control"
                      component={renderField} />
                  <Button
                      className="ui primary button"
                      type="submit"
                      disabled={this.props.isLoading}>
                    Create Account
                  </Button>
                  <Link className="white-link" to="/">
                    <Button type="button" className="ui red button">
                      Cancel
                    </Button>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
        <ErrorMessageModal/>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.username) {
    errors.username = 'Enter a username!';
  }

  if (values.username && values.username.length < 8) {
    errors.username = 'Usernames must be at least 8 characters!';
  }

  if (!values.email) {
    errors.email = 'Enter an Email!';
  }

  if (values.email &&
      !values.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
    errors.email = 'Enter a real email!';
  }

  if (!values.pw) {
    errors.pw = 'Enter a Password!';
  }

  if (values.pw && values.pw.length < 8) {
    errors.pw = 'Password too short!';
  }

  if (values.pw !== values.confirm_pw) {
    errors.confirm_pw = 'Passwords are not equal!';
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    isLoading: state.loading.isLoading,
  };
}

export default reduxForm({
  validate: validate,
  form: 'CreateAccountPageForm',
})(connect(mapStateToProps, { createAccount })(CreateAccountPage));