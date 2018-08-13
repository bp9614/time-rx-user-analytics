import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ErrorMessageModal from './error_message_modal';
import renderField from './render_field';
import { signIn } from '../actions/aws';
import { closeModal } from '../actions/modal';
import './landing_page.css';

class LoginPage extends Component {
  onSubmit(values) {
    this.props.signIn(values.username, values.pw, () => (
      this.props.history.push('/analytics')
    ));
  }

  componentWillMount() {
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <div className="outer">
          <div className="middle">
            <div className="login-page">
              <div className="form">
                <h3 className="text-centered cursive-font bootstrap-h3">
                  Time-Rx
                </h3>
                <h3 className="text-centered bootstrap-h3 lower-margin">
                  User Analytics
                </h3>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                  <Field
                      label="Username" id="username" name="username"
                      type="text" placeholder="Username"
                      className="bootstrap-form-control"
                      component={renderField} />
                  <Field
                      label="Password" id="pw" name="pw" type="password"
                      placeholder="Password" className="bootstrap-form-control"
                      component={renderField} />
                  <Link to="/password_reset">
                    Forgot your password?
                  </Link>
                  <button
                      type="submit"
                      disabled={this.props.isLoading}
                      className="margin-very-small-below login-button margin-very-small-above">
                    Submit
                  </button>
                </form>
                <Link to="/create_account">
                  Create an account
                </Link><br/>
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
    errors.username = 'Enter a Username!';
  }

  if (!values.pw) {
    errors.pw = 'Enter a Password!';
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    isLoading: state.loading.isLoading,
    showModal: state.modal.showModal,
    errorMsg: state.modal.errorMsg,
  };
}

export default reduxForm({
  validate: validate,
  form: 'LoginPageForm',
})(connect(mapStateToProps, { closeModal, signIn })(LoginPage));