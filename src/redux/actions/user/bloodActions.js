import axios from 'axios';
import {AUTH_HEADER} from '../../../utils';
import {GET_BLOOD_SERVICES} from './types';

export const getBloodServices = city => async dispatch => {
  try {
    const {data} = await axios.get(
      `/services/blood_provide?city=${city}`,
      AUTH_HEADER
    );
    dispatch({type: GET_BLOOD_SERVICES, payload: data.services});
  } catch (err) {
    console.error(err);
  }
};
