import React, { Component } from 'react';
import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';

import Popup from '../components/UI/Popup';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';
import * as actions from '../redux/actions';
import Button from '../components/UI/Button/Button';

const actionCreators = {
  auth: actions.auth,
  createUser: actions.createUser,
};

class Auth extends Component {
  state = {
    isSignUp: false,
  }

  handleSignChange = () => {
    this.setState((state) => ({ isSignUp: !state.isSignUp }));
  }

  handleAuthSubmit = async ({ email, password, name }) => {
    const { auth, history, createUser } = this.props;
    const { isSignUp } = this.state;

    try {
      const { localId: userId } = await auth({ email, password, isSignUp });
      await createUser({ email, userId, userName: name });
      history.push('/');
    } catch (error) {
      const { response } = error;

      if (!response) {
        throw new SubmissionError({ _error: error.message });
      }
      
      const { data: { error: { message } } } = response;
      const firebaseErrors = {
        'EMAIL_EXISTS': { email: 'Пользователь с таким email уже существует' },
        'EMAIL_NOT_FOUND': { email: 'Пользователя с таким email не существует' },
        'INVALID_PASSWORD': { password: 'Проверьте правильность пароля' },
      };
      const submissionError = firebaseErrors[message] || { _error: message };
      
      throw new SubmissionError(submissionError);
    }
  }

  render() {
    return (
      <Popup>
        {
          this.state.isSignUp
            ? <>
                <h3>Регистрация для получения доступа</h3>
                <SignUpForm onSubmit={this.handleAuthSubmit} />
                <p>Уже есть аккаунт? <Button buttonType="link" onClick={this.handleSignChange}>Войти!</Button></p>
              </>
            : <>
                <h3>Войдите для работы</h3>
                <SignInForm onSubmit={this.handleAuthSubmit} />
                <p>Нет аккаунта? <Button buttonType="link" onClick={this.handleSignChange}>Зарегистрироваться!</Button></p>
              </>
        }
      </Popup>
    );
  }
};

export default connect(null, actionCreators)(Auth);
 