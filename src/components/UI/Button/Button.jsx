import React from 'react';

import styles from './Button.module.scss';

const Button = props => {
  const { children, buttonType, ...restProps } = props;
  const classNames = [styles.button, buttonType === 'link' && styles.button_link].join(' ');

  return (
    <button {...restProps} className={classNames}>{children}</button>
  );
};

export default Button;
