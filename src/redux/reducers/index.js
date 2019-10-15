  
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { handleActions } from 'redux-actions';

import * as actions from '../actions';

const initialState = {
  token: null,
  userId: null,
};

const auth = handleActions({
  [actions.authSuccess](state, { payload: { token, userId } }) {
    return {
      ...state,
      token,
      userId,
    };
  },
  [actions.authLogoutSuccess](state) {
    return {
      ...state,
      token: null,
      userId: null,
    }
  },
}, initialState);

export default combineReducers({
  form: formReducer,
  auth,
});
