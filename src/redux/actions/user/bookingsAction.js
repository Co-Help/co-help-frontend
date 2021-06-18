import axios from 'axios';
import {AUTH_HEADER} from '../../../utils';
import {GET_BOOKED_VACCINES} from './types';

export const getBookedVaccines = () => async dispatch => {
  try {
    const {data} = await axios.get('/services/vaccination/booked', AUTH_HEADER);
    dispatch({type: GET_BOOKED_VACCINES, payload: data?.services});
  } catch (err) {
    console.error(err);
  }
};
