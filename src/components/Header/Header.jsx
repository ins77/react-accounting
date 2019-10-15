import React from 'react';

import styles from './Header.module.scss';

const Header = ({ userName }) => {
  return (
    <header className={styles.header}>
      <div className={styles.dropdown}>
        Здравствуйте, {userName}
      </div>
    </header>
  );
};

export default Header;
