import React, { Component } from 'react';
import { connect } from 'react-redux';

import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';
import styles from './Layout.module.scss';
import * as actions from '../../redux/actions';
import Spinner from '../../components/Spinner/Spinner';

const mapStateToProps = ({ currentUser, auth, fetchCurrentUserState }) => (
  {
    currentUser,
    auth,
    isLoading: fetchCurrentUserState === 'requested',
  }
);

const actionCreators = {
  fetchCurrentUser: actions.fetchCurrentUser,
};

class Layout extends Component {
  componentDidMount() {
    this.props.fetchCurrentUser(this.props.auth.userId);
  }

  render() {
    const { children, currentUser, isLoading } = this.props;

    return isLoading ? <Spinner /> : (
      <div className={styles.wrap}>
        <div className={styles.header}>
          <Header userName={currentUser.userName} />
        </div>
        <div className={styles.menu}>
          <Menu />
        </div>
        <div className={styles.body}>
          {children}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(Layout);