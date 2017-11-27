import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllUsers } from '../actions/index';
import { getAllEmployeeAvailabilities } from '../actions/index';
import { getAllDayParts } from '../actions/index';
import { getAllNeededEmployees } from '../actions/index';
import { getAllScheduleDates } from '../actions/index';
import { changeView } from '../actions/index';
import { checkedIfLoggedIn } from '../actions/index';
import { logout } from '../actions/index';

import Dashboard from '../components/Dashboard.jsx';
import FlashMessage from '../components/FlashMessage.jsx';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';

class App extends Component {

  componentWillMount() {
    this.props.checkedIfLoggedIn();
  //   this.props.getAllUsers();
  //   this.props.getAllEmployeeAvailabilities();
  //   this.props.getAllDayParts();
  //   this.props.getAllNeededEmployees();
  //   this.props.getAllScheduleDates();
  }

  // componentWillReceiveProps() {
  //   // debugger
  //   if (this.props.view !== 'employeeEditor') {
  //     debugger
  //   }
  // }

  renderFlashMessage() {
    if (this.props.flashMessage) {
      return <FlashMessage message={this.props.flashMessage.message} type={this.props.flashMessage.type} />
    } else {
      return;
    }
  }

  renderView() {
    if (this.props.view === 'login') {
      return <Login />;
    } else if (this.props.view === 'signup') {
      return <SignUp />
    } else if (this.props.view === 'employeeEditor' || this.props.view === 'scheduleEditor') {
      return <Dashboard />;
    }
    return <div />;
  }

  renderNav() {
    if(!this.props.users) {
      return (
        <div>
          <div className="nav-item nav-login" onClick={() => { this.props.changeView('login')}}>
            Log in
          </div>
          <div className="nav-item nav-signup" onClick={() => { this.props.changeView('signup')}}>
            Sign up
          </div>
        </div>
      );
    }
    return (
      <div className="nav-item nav-logout" onClick={() => { this.props.logout()}}>
        Log out
      </div>
    );
  }

  render() {
    return (
      <div className="app-container clear-fix">
        <div className="navbar clear-fix">
          <div className="nav-left">
            <div className="nav-item nav-logo">
              Shiftly
            </div>
          </div>
          <div className="nav-right">
          {this.renderNav()}
          </div>
        </div>
         {this.renderFlashMessage()}
         {this.renderView()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    view: state.view,
    flashMessage: state.flashMessage,
    users: state.users,
    selectedWeek: state.selectedWeek,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    // getAllUsers: getAllUsers,
    // getAllEmployeeAvailabilities: getAllEmployeeAvailabilities,
    // getAllDayParts: getAllDayParts,
    // getAllNeededEmployees: getAllNeededEmployees,
    // getAllScheduleDates: getAllScheduleDates,
    checkedIfLoggedIn: checkedIfLoggedIn,
    changeView: changeView,
    logout: logout,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
