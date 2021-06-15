import {APP_NAME} from '../constants';

export const getUserCred = () => {
  return JSON.parse(localStorage.getItem(`${APP_NAME}_USER_INFO`));
};

export const access_token = getUserCred()?.access_token;
export const AUTH_HEADER = {headers: {Authorization: `Bearer ${access_token}`}};

export const getServicesList = services =>
  Object.entries(services)
    .filter(s => s[1])
    .map(s => s[0].split('_')[0]);
