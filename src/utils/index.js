import {APP_NAME} from '../constants';

export const getUserCred = () => {
  return JSON.parse(localStorage.getItem(`${APP_NAME}_USER_INFO`));
};

export const access_token = getUserCred()?.access_token;
export const AUTH_HEADER = {headers: {Authorization: `Bearer ${access_token}`}};
