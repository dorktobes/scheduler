import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllUsers } from '../actions/index';
import { getAllEmployeeAvailabilities } from '../actions/index';
import { getAllDayParts } from '../actions/index';

import EmployeeEditor from './EmployeeEditor.jsx';
import ScheduleGenerator from './ScheduleGenerator.jsx';

class App extends Component {

  componentWillMount() {
    this.props.getAllUsers();
    this.props.getAllEmployeeAvailabilities();
    this.props.getAllDayParts();
  }

  render() {
    return (
      <div> 
        <EmployeeEditor />
        <ScheduleGenerator />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAllUsers: getAllUsers,
    getAllEmployeeAvailabilities: getAllEmployeeAvailabilities,
    getAllDayParts: getAllDayParts,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(App);
