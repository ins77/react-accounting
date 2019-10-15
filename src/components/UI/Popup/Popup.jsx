import React from 'react';

import styles from './Popup.module.scss';

const Popup = (props) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.popup}>
        <header className={styles.header}>
          <h3 className={styles.title}>Домашняя бухгалтерия</h3>
        </header>
        <div className={styles.body}>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Popup;
