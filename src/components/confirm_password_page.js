import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import ErrorMessageModal from './error_message_modal';
import renderField from './render_field';
import { confirmPassword } from '../actions/aws';
import './landing_page.css';

class ConfirmPasswordPage extends Component {
  onSubmit(values) {
    this.props.confirmPassword(
      this.props.username,
      values.code, values.password,
      () => {this.props.history.push('/password_has_reset')
    });
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
                      label="Confirmation Code" id="code" name="code"
                      type="password" placeholder="Code"
                      className="bootstrap-form-control"
                      component={renderField} />
                  <Field
                      label="New Password" id="password" name="password"
                      type="password" placeholder="New Password"
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

  if (!values.code) {
    errors.code = 'Enter the verification code!';
  }

  if (!values.password) {
    errors.password = 'Enter a new password!';
  }

  if (values.password && values.password < 8) {
    errors.password = 'Password too short!';
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    isLoading: state.loading.isLoading,
    showModal: state.modal.showModal,
    username: state.aws.username,
  };
}

export default reduxForm({
  validate: validate,
  form: 'ConfirmPasswordForm',
})(connect(mapStateToProps, { confirmPassword })(ConfirmPasswordPage));

