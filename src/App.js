import React, { Component } from 'react';
import logo from './logo.svg';
import {TableList} from './table-list'
import './app.css';
/*
Present the title of table,compose all components no functions needed
*/

class App extends Component {

  render() {
    return (
      <div className="app">
        <div className="list-header">
          <img src={logo} className="company-logo" alt="logo" />
        </div>
        <div className="list-body">
          <h1 className="body-title">List of Participants</h1>
          <TableList/>
        </div>
     </div>
    );
  }
}

export default App;
