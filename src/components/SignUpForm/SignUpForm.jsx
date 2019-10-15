import React from 'react';
import { reduxForm, Field } from 'redux-form'; 

import Input from '../UI/Input/Input';
import Button from '../UI/Button';
import { required, email, matchedPassword, minLength, maxLength, asyncValidate } from '../../utils/validators';

const SignUpForm = props => {
  const { handleSubmit, pristine, submitting, invalid, asyncValidating } = props;
  const disabled = asyncValidating || pristine || invalid || submitting;

  return (
    <form onSubmit={handleSubmit}>
      <div className="b-form-row">
        <Field component={Input} type="text" name="name" label="Имя" validate={[required]} />
      </div>
      <div className="b-form-row">
        <Field component={Input} type="email" name="email" label="Email" validate={[required, email]} />
      </div>
      <div className="b-form-row">
        <Field component={Input} type="password" name="password" label="Пароль" validate={[required, minLength(5), maxLength(15)]} />
      </div>
      <div className="b-form-row">
        <Field component={Input} type="password" name="passwordConfirm" label="Подтверждение пароля" validate={[required, matchedPassword]} />
      </div>
      <Button type="submit" disabled={disabled}>Зарегистрироваться</Button>
    </form>
  );
};

export default reduxForm({
  form: 'signUpForm',
  // asyncValidate,
  // asyncBlurFields: ['email'],
})(SignUpForm);
