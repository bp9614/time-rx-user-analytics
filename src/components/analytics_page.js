import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Loader, Menu } from 'semantic-ui-react';
import { reduxForm } from 'redux-form';
import LoadingSpinner from './loading_spinner';
import { logout } from '../actions/aws';
import Chart from '../containers/chart';
import EmptyResponseModal from '../components/empty_response_modal';
import History from '../containers/history';
import SearchModal from '../containers/search_modal';

class AnalyticsPage extends Component {
  componentWillMount() {

  }

  render() {
    return (
      <div>
        <Menu inverted color="blue" borderless>
          <Menu.Item disabled={true}>
            <p className="cursive-font larger-text">Time-Rx</p>
          </Menu.Item>
          <Menu.Item>
            {this.props.currentUser ? 
              <p className="cursive-font larger-text">
                Welcome, {this.props.currentUser}
              </p> : <Loader active></Loader>}
          </Menu.Item>
          <Menu.Item
              position="right"
              onClick={this.props.logout}>
            <p className="larger-text">Logout</p>
          </Menu.Item>
        </Menu>
        <SearchModal/>
        <EmptyResponseModal/>
        <div className="wrap">
          <div className="left-half thin-border">
            <div className="middle horizontally-centered">
              <Chart/>
            </div>
          </div>
          <div className="right-half thin-border">
            <div className="middle horizontally-centered">
              <History/>
            </div>
          </div>
        </div>
        <LoadingSpinner/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.aws.currentUser,
  }
}

export default reduxForm({
  form: 'RefineSearchForm'
})(connect(mapStateToProps, { logout })(AnalyticsPage));