import React, { Component } from 'react';
import TradesPage from './trades/TradesPage';
import NavTabs from './public/NavTabs';
import TransfersPage from './transfers/TransfersPage';
import  TransportsPage from './transports/TransportsPage';
import { Route, BrowserRouter as Router } from 'react-router-dom';

class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <NavTabs />
            <Route exact path='/' component={TradesPage} />
            <Route path='/transfersPage' component={TransfersPage} />
            <Route path='/transportsPage' component={TransportsPage} />
          </div>
        </Router>
    );
  }
}

export default App;
