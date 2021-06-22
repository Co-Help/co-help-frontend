import axios from 'axios';
import {AUTH_HEADER} from '../../../utils';
import {
  ADD_APPOINTMENT_SUCCESS,
  DELETE_APPOINTMENT,
  DONE_APPOINTMENT,
  GET_APPOINTMENTS,
  GET_APPOINTMENT_BATCH,
} from './types';

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

export const setAppointmentDone = id => async dispatch => {
  try {
    await axios.post('/org/appointment/done', {id, done: true}, AUTH_HEADER);
    dispatch({type: DONE_APPOINTMENT, payload: id});
  } catch (err) {
    console.error(err);
  }
};

export const deleteAppointment = id => async dispatch => {
  try {
    await axios.delete('/org/appointment', {...AUTH_HEADER, data: {id}});
    dispatch({type: DELETE_APPOINTMENT, payload: id});
  } catch (err) {
    console.error(err);
  }
};

export const getAppointmentByBatch = batch_code => async dispatch => {
  try {
    const {data} = await axios.get(
      `/org/appointment/by_batch_code?batch_code=${batch_code}`,
      AUTH_HEADER
    );
    dispatch({type: GET_APPOINTMENT_BATCH, payload: data.services});
  } catch (err) {
    console.error(err);
  }
};
