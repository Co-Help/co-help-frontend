import axios from 'axios';
import {APP_NAME} from '../../../constants';
import {AUTH_HEADER, getUserCred} from '../../../utils';
import {
  APPLY_FOR_ORG,
  APPLY_FOR_ORG_FAIL,
  COMPLETE_PROFILE,
  FETCH_PROFILE,
  LOGIN,
  LOGOUT,
} from './types';

export const login = data => async dispatch => {
  dispatch({type: LOGIN, payload: data.user});
  localStorage.setItem(`${APP_NAME}_USER_INFO`, JSON.stringify(data));
};

export const logout = () => async dispatch => {
  dispatch({type: LOGOUT});
  localStorage.removeItem(`${APP_NAME}_USER_INFO`);
};

export const fetchProfile = () => async dispatch => {
  try {
    const {data} = await axios.get('/user/profile', AUTH_HEADER);
    const profile = {...data.profile, id: data.profile._id};
    dispatch({
      type: FETCH_PROFILE,
      payload: profile,
    });
    const localUser = JSON.parse(localStorage.getItem(`${APP_NAME}_USER_INFO`));
    localStorage.setItem(
      `${APP_NAME}_USER_INFO`,
      JSON.stringify({...localUser, user: profile})
    );
  } catch (err) {
    // TODO: logout maybe? if there's a error
    console.error(err);
  }
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

export const applyForOrg = data => async dispatch => {
  try {
    const {access_token} = getUserCred();
    await axios.post(
      '/application/apply',
      {
        ...data,
        pinCode: Number(data.pinCode),
        helpline_no: Number(data.helpline_no),
      },
      {headers: {Authorization: `Bearer ${access_token}`}}
    );
    dispatch({type: APPLY_FOR_ORG});
  } catch (err) {
    dispatch({type: APPLY_FOR_ORG_FAIL, payload: err.response.data.msg});
  }
};
