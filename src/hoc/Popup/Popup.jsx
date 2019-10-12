import React from 'react';
// import classNames from 'classnames/bind';
import styles from './Popup.module.scss';

// const cx = classNames.bind(styles);

const Popup = (props) => {
  return (
    <>
      <div className={styles.backdrop}></div>
      <div className={styles.popup}>
        <header className={styles.header}>
          <h3 className={styles.title}>Домашняя бухгалтерия</h3>
        </header>
        <div className={styles.body}>
          {props.children}
        </div>
      </div>
    </>
  );
};

export default Popup;
