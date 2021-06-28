import axios from 'axios';
import {APP_NAME} from '../constants';

export const getUserCred = () => {
  return JSON.parse(localStorage.getItem(`${APP_NAME}_USER_INFO`));
};

export const access_token = getUserCred()?.access_token;
export const AUTH_HEADER = {headers: {Authorization: `Bearer ${access_token}`}};

export const formatDate = dateString => dateString?.split('T')[0];

export const getServicesList = services =>
  Object.entries(services)
    .filter(s => s[1])
    .map(s => {
      const splitted = s[0].split('_');
      return {title: splitted[0] + ' ' + (splitted[1] ?? ''), to: `/${s[0]}`};
    });

export const toastOptions = {
  status: 'success',
  duration: 5000,
  isClosable: true,
  position: 'bottom-right',
};

export const errorToastOptions = {
  ...toastOptions,
  status: 'error',
  title: 'Something went wrong',
};

export const getUserPosition = (cb, error) =>
  navigator.geolocation
    ? navigator.geolocation.getCurrentPosition(
        ({coords}) => cb(coords),
        err => error(err.message)
      )
    : error('Geolocation is not supported by this browser');

export const getAddress = async coords => {
  try {
    const {data} = await axios.get(
      `https://nominatim.openstreetmap.org/reverse.php?lat=${coords?.latitude}&lon=${coords?.longitude}&format=jsonv2`
    );
    return data?.address;
  } catch (err) {
    throw new Error('Failed to get user address');
  }
};
