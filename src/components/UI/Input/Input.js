import React from 'react';
import classNames from 'classnames/bind';

import styles from './Input.module.scss';

const cx = classNames.bind(styles);

const getInputClassName = meta => {
  const { asyncValidating, valid, invalid, submitting, touched } = meta;

  if ((asyncValidating && valid) || submitting) return styles.input_async;
  if (touched && invalid) return styles.input_invalid;
  if (touched && valid) return styles.input_valid;
};

const Input = props => {
  const { type, input, meta, label, autoFocus } = props;
  const hasError = meta.error && meta.touched;
  const inputStyles = cx(styles.input, getInputClassName(meta));

  return (
    <div className={styles.wrap}>
      <label className={styles.label}>{label}</label>
      <input {...input} type={type} autoFocus={autoFocus} className={inputStyles} />
      {hasError && <div className={styles.errorText}>{meta.error}</div>}
    </div>
  );
};

export default Input;
