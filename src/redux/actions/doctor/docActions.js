import axios from 'axios';
import {AUTH_HEADER} from '../../../utils';
import {ADD_APPOINTMENT_SUCCESS, GET_APPOINTMENTS} from './types';

export const addAppointment = data => async dispatch => {
  try {
    await axios.post(
      '/org/appointment',
      {
        ...data,
        appointment_date: new Date(data.appointment_date).getTime().toString(),
        cost: +data.cost,
        quantity: +data.quantity,
      },
      AUTH_HEADER
    );
    dispatch({type: ADD_APPOINTMENT_SUCCESS, payload: true});
  } catch (err) {
    dispatch({type: ADD_APPOINTMENT_SUCCESS, payload: false});
    console.error(err);
  }
};

export const getAppointments = () => async dispatch => {
  try {
    const {data} = await axios.get('/org/appointment', AUTH_HEADER);
    dispatch({type: GET_APPOINTMENTS, payload: data?.services});
  } catch (err) {
    console.error(err);
  }
};
