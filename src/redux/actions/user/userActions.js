import {APP_NAME} from '../../../constants';
import {LOGIN, LOGOUT} from './types';

export const login = data => async dispatch => {
  dispatch({type: LOGIN, payload: data.user});
  localStorage.setItem(`${APP_NAME}_USER_INFO`, JSON.stringify(data));
};

export const logout = () => async dispatch => {
  dispatch({type: LOGOUT});
  localStorage.removeItem(`${APP_NAME}_USER_INFO`);
};
