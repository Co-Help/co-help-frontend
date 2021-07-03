import axios from 'axios';
import {AUTH_HEADER} from '../../../utils';
import {USER_FETCH_OXYGEN} from './types';

export const getOxygenServices = () => async dispatch => {
  try {
    const {data} = await axios.get(`/services/oxygen_provide`, AUTH_HEADER);
    dispatch({type: USER_FETCH_OXYGEN, payload: data.services});
  } catch (err) {
    console.error(err);
  }
};

export const bookOxygenService = (data, cb, errorCb) => async () => {
  try {
    await axios.post(
      `/services/oxygen_provide`,
      {...data, quantity: +data.quantity},
      AUTH_HEADER
    );
    cb?.();
  } catch (err) {
    errorCb?.(err);
  }
};
