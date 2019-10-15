import { createAction } from 'redux-actions';
import axios from 'axios';

export const init = createAction('INIT');
export const authLogoutSuccess = createAction('AUTH_LOGOUT_SUCCESS');
export const authSuccess = createAction('AUTH_SUCCESS');
export const createUserSuccess = createAction('CREATE_USER_SUCCESS');

export const fetchCurrentUserRequest = createAction('FETCH_USER_REQUEST');
export const fetchCurrentUserSuccess = createAction('FETCH_USER_SUCCESS');
export const fetchCurrentUserFailure = createAction('FETCH_USER_FAILURE');

export const authLogout = () => dispatch => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');

  dispatch(authLogoutSuccess());
};

export const auth = ({ email, password, isSignUp }) => async dispatch => {
  const authData = { email, password, returnSecureToken: true };
  const authToken = 'AIzaSyCw_yA_gmJpKLzgjq0Fm6Es74jmqEra5OU';
  const authType = isSignUp ? 'signUp' : 'signInWithPassword';
  const { data } = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:${authType}?key=${authToken}`, authData);
  
  if (isSignUp) return data;

  const { idToken: token, localId: userId, expiresIn } = data;

  dispatch(authSuccess({ token, userId }));
  // TODO: добавить moment.js
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  localStorage.setItem('token', token);
  localStorage.setItem('expirationDate', expirationDate);
  localStorage.setItem('userId', userId);
  dispatch(checkOutAuth(expiresIn));
};

export const createUser = user => async dispatch => {
  // TODO: запросы по токену
  await axios.post('https://accounting-f280e.firebaseio.com/users.json', user);
};

export const checkOutAuth = expirationTime => async dispatch => {
  setTimeout(() => {
    dispatch(authLogout());
  }, expirationTime * 1000);
};

export const authCheckState = () => dispatch => {
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(authLogoutSuccess());
    return;
  };

  const expirationDate = new Date(localStorage.getItem('expirationDate'));

  if (expirationDate <= new Date()) {
    dispatch(authLogoutSuccess());
    return;
  }

  const userId = localStorage.getItem('userId');
  const expirationTime = (expirationDate.getTime() - new Date().getTime()) / 1000;

  dispatch(authSuccess({ token, userId }));
  dispatch(checkOutAuth(expirationTime));
};

export const fetchCurrentUser = userId => async dispatch => {
  dispatch(fetchCurrentUserRequest());

  try {
    const { data: user } = await axios.get(`https://accounting-f280e.firebaseio.com/users.json?orderBy="userId"&equalTo="${userId}"`);
    dispatch(fetchCurrentUserSuccess({ user }));
  } catch (error) {
    dispatch(fetchCurrentUserFailure());
    throw error;
  }
};
