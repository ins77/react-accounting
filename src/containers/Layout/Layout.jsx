import React, { Component } from 'react';
import { connect } from 'react-redux';

import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';
import styles from './Layout.module.scss';
import * as actions from '../../redux/actions';

const mapStateToProps = ({ currentUser, auth, fetchCurrentUserState }) => (
  { currentUser, auth, fetchCurrentUserState }
);

const actionCreators = {
  fetchCurrentUser: actions.fetchCurrentUser
};

class Layout extends Component {
  componentDidMount() {
    this.props.fetchCurrentUser(this.props.auth.userId);
  }

  render() {
    const { children, currentUser, fetchCurrentUserState } = this.props;

    return (
      <>
        {
          fetchCurrentUserState === 'requested' && <div>Идет загрузка, подождите...</div>
        }
        {
          fetchCurrentUserState === 'failed' && <div>Ошибка! TODO: authLogout</div>
        }
        {
          fetchCurrentUserState === 'finished' &&
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
        }
      </>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(Layout);
