import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './landing_page.css';

export default class AccountConfirmationPage extends Component {
  render() {
    return (
      <div>
        <div className="outer">
          <div className="middle">
            <div className="login-page">
              <div className="form">
                <h2 className="text-centered">Account Has Been Created</h2>
                <Link className="white-link" to="/">
                  <button
                      type="submit"
                      disabled={this.props.isLoading}
                      className="margin-very-small-below login-button margin-very-small-above">
                    OK
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}