import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';


import renderField from './render_field';

class ResetPassword extends Component {
    render() {
        return (
            <div>
                <form>
                    <Field label="Enter Username" id="username" name="username" type="username" component={renderField}></Field>
                    <button type="submit" className="btn btn-primary right-margin">Reset</button>
                    <Link to="/" className="btn btn-danger">Cancel</Link>
                </form>
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

export default reduxForm({
    validate: validate,
    form: 'ResetPasswordForm',
})(ResetPassword);

