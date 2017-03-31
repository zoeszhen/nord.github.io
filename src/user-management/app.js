import React, { Component } from 'react';
import {TableList} from './table-list'
import '../style/app.css';
/*
Present the title of table,compose all components no functions needed
*/

class App extends Component {

  render() {
    return (
      <div className="app">
        <div className="list-header">
          <img src="https://nordsoftware.github.io/assets/nordlogo.svg" className="company-logo" alt="logo" />
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
