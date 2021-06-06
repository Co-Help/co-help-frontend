import {APP_NAME} from '../constants';

export const getUserCred = () => {
  return JSON.parse(localStorage.getItem(`${APP_NAME}_USER_INFO`));
};
