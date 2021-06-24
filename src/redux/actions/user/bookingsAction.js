import axios from 'axios';
import {AUTH_HEADER} from '../../../utils';
import {CANCEL_APPOINTMENT, GET_BOOKED_SERVICES} from './types';

export const getBookedServices = () => async dispatch => {
  try {
    const {data} = await axios.get('/services/booked', AUTH_HEADER);
    dispatch({type: GET_BOOKED_SERVICES, payload: data?.results});
  } catch (err) {
    console.error(err);
  }
};

export const cancelAppointment = (id, cb) => async dispatch => {
  try {
    await axios.post('/services/appointment/cancel', {id}, AUTH_HEADER);
    dispatch({type: CANCEL_APPOINTMENT, payload: id});
    cb();
  } catch (err) {
    console.error(err);
  }
};
