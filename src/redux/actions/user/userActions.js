import axios from 'axios';
import {APP_NAME} from '../../../constants';
import {getUserCred} from '../../../utils';
import {COMPLETE_PROFILE, LOGIN, LOGOUT} from './types';

export const login = data => async dispatch => {
  dispatch({type: LOGIN, payload: data.user});
  localStorage.setItem(`${APP_NAME}_USER_INFO`, JSON.stringify(data));
};

export const logout = () => async dispatch => {
  dispatch({type: LOGOUT});
  localStorage.removeItem(`${APP_NAME}_USER_INFO`);
};

export const completeProfile = data => async dispatch => {
  try {
    const dob = new Date(data.dob).getTime();
    const {access_token} = getUserCred();
    await axios.post(
      '/user/profile/setup',
      {
        ...data,
        dob,
        pinCode: Number(data.pinCode),
        mobile_no: Number(data.mobile_no),
      },
      {headers: {Authorization: `Bearer ${access_token}`}}
    );
    dispatch({type: COMPLETE_PROFILE});
  } catch (error) {
    console.error(error);
  }
};
