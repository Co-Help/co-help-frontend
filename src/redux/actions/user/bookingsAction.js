import axios from 'axios';
import {AUTH_HEADER} from '../../../utils';
import {
  CANCEL_APPOINTMENT,
  CANCEL_BLOOD_TEST_BOOKING,
  CANCEL_OXYGEN_BOOKING,
  CANCEL_VACCINE_BOOKING,
  GET_BOOKED_SERVICES,
} from './types';

export const getBookedServices = () => async dispatch => {
  try {
    const {data} = await axios.get('/services/booked', AUTH_HEADER);
    dispatch({type: GET_BOOKED_SERVICES, payload: data?.results});
  } catch (err) {
    console.error(err);
  }
};

export const cancelAppointment = (id, cb, errCb) => async dispatch => {
  try {
    await axios.post('/services/appointment/cancel', {id}, AUTH_HEADER);
    dispatch({type: CANCEL_APPOINTMENT, payload: id});
    cb?.();
  } catch (err) {
    errCb?.(err);
  }
};

export const cancelBloodTestBooking = (id, cb, errCb) => async dispatch => {
  try {
    await axios.delete('/services/blood_test', {...AUTH_HEADER, data: {id}});
    dispatch({type: CANCEL_BLOOD_TEST_BOOKING, payload: id});
    cb?.();
  } catch (err) {
    errCb?.(err);
  }
};

export const cancelVaccinationBooking = (id, cb, errCb) => async dispatch => {
  try {
    await axios.delete('/services/vaccination', {...AUTH_HEADER, data: {id}});
    dispatch({type: CANCEL_VACCINE_BOOKING, payload: id});
    cb?.();
  } catch (err) {
    errCb?.(err);
  }
};

export const cancelOxygenBooking =
  (booking_date, cb, errorCb) => async dispatch => {
    try {
      await axios.delete(`/services/oxygen_provide`, {
        ...AUTH_HEADER,
        data: {booking_date},
      });
      dispatch({type: CANCEL_OXYGEN_BOOKING, payload: booking_date});
      cb?.();
    } catch (err) {
      errorCb?.(err);
    }
  };
