import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Auth from '../Auth';
import History from '../History';
import * as actions from '../../redux/actions';

const actionCreators = {
  authCheckState: actions.authCheckState,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  }
};

class App extends Component {
  componentDidMount() {
    this.props.authCheckState();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Redirect to="/auth" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Switch>
            <Route path="/history" component={History} />
            <Redirect to="/history" />
            {/* TODO: 404? <Route path="*" component={NotFound} /> */}
          </Switch>
        </Switch>
      );
    }

    return (
      <BrowserRouter>
        {routes}
      </BrowserRouter>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(App);
