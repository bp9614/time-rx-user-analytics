import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import ErrorMessageModal from './error_message_modal';
import renderField from './render_field';
import { confirmAccount } from '../actions/aws';
import './landing_page.css';

class ConfirmAccountPage extends Component {
  onSubmit(values) {
    this.props.confirmAccount(
      this.props.username, values.code,
      () => {this.props.history.push('/create_account_confirmation')
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
                  <Button
                      className="ui primary button"
                      type="submit"
                      disabled={this.props.isLoading}>
                    Confirm Account
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
  form: 'ConfirmAccountCodeForm',
})(connect(mapStateToProps, { confirmAccount })(ConfirmAccountPage));

