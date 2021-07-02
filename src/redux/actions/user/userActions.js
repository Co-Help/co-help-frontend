import axios from 'axios';
import {APP_NAME} from '../../../constants';
import {AUTH_HEADER, formatAadhaarNo} from '../../../utils';
import {
  APPLY_FOR_ORG,
  APPLY_FOR_ORG_FAIL,
  COMPLETE_PROFILE,
  FETCH_PROFILE,
  LOGIN,
  LOGOUT,
  SEARCH,
} from './types';

export const login = data => async dispatch => {
  localStorage.setItem(`${APP_NAME}_USER_INFO`, JSON.stringify(data));
  dispatch({type: LOGIN, payload: data.user});
};

export const logout = () => async dispatch => {
  dispatch({type: LOGOUT});
  localStorage.removeItem(`${APP_NAME}_USER_INFO`);
};

export const fetchProfile = () => async dispatch => {
  try {
    const {data} = await axios.get('/user/profile', AUTH_HEADER);
    const profile = {...data.profile, id: data.profile._id, org: data.org};
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

export const completeProfile = (form, cb, errorCb) => async dispatch => {
  try {
    const data = {
      ...form,
      aadhar: formatAadhaarNo(form?.aadhar),
      dob: new Date(form.dob).getTime(),
      pinCode: Number(form.pinCode),
      mobile_no: Number(form.mobile_no),
    };
    await axios.post('/user/profile/setup', data, AUTH_HEADER);
    dispatch({type: COMPLETE_PROFILE});
    cb?.();
  } catch (error) {
    errorCb?.(error);
  }
};

export const applyForOrg = form => async dispatch => {
  try {
    const data = {
      ...form,
      pinCode: Number(form.pinCode),
      helpline_no: Number(form.helpline_no),
    };
    await axios.post('/application/apply', data, AUTH_HEADER);
    dispatch({type: APPLY_FOR_ORG});
  } catch (err) {
    dispatch({type: APPLY_FOR_ORG_FAIL, payload: err.response.data.msg});
  }
};

export const search = what => async dispatch => {
  try {
    const {data} = await axios.get(
      `/services/search?city=${what}`,
      AUTH_HEADER
    );
    dispatch({type: SEARCH, payload: data.results});
  } catch (err) {
    console.error(err);
  }
};
