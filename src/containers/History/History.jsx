import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/UI/Button/Button';
import * as actions from '../../redux/actions';

const actionCreators = {
  authLogout: actions.authLogout,
};

class History extends Component {
  render() {
    const { authLogout } = this.props;

    return (
      <div>History Page <Button type="button" onClick={authLogout}>Выйти</Button></div>
    );
  }
};

export default connect(null, actionCreators)(History);
