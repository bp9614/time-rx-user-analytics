import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import ErrorMessageModal from './error_message_modal';
import renderField from './render_field';
import { forgotPassword } from '../actions/aws';
import './landing_page.css';

class ResetPasswordPage extends Component {
  onSubmit(values) {
    this.props.forgotPassword(
      values.username, 
      () => {this.props.history.push('/password_change')}
    );
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
                  <Button
                      className="ui primary button"
                      type="submit"
                      disabled={this.props.isLoading}>
                    Reset Password
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
    errors.username = 'Enter a Username!';
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    isLoading: state.loading.isLoading,
    showModal: state.modal.showModal,
  };
}

export default reduxForm({
  validate: validate,
  form: 'ResetPasswordForm',
})(connect(mapStateToProps, { forgotPassword })(ResetPasswordPage));

