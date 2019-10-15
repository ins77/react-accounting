import React from 'react';
import { reduxForm, Field } from 'redux-form';

import Input from '../UI/Input';
import { required, email } from '../../utils/validators';
import Button from '../UI/Button/Button';

const SignInForm = (props) => {
  const { handleSubmit, pristine, submitting, error, invalid } = props;
  const disabled = pristine || invalid || submitting;

  return (
    <form onSubmit={handleSubmit}>
      <div className="b-form-row">
        <Field name="email" type="email" component={Input} label="Email" validate={[required, email]} />
      </div>
      <div className="b-form-row">
        <Field name="password" type="password" component={Input} label="Пароль" validate={[required]} />
      </div>
      {error && <div style={{color: 'rgb(149, 18, 18)', textAlign: 'center', marginBottom: '20px'}}>{error}</div>}
      <Button type="submit" disabled={disabled}>Войти</Button>
    </form>
  );
}

export default reduxForm({
  form: 'SignInForm',
  // asyncValidate,
  // asyncBlurFields: ['email', 'password'],
})(SignInForm);
