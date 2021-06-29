import axios from 'axios';
import {AUTH_HEADER} from '../../../utils';
import {
  BOOK_APPOINTMENT,
  FETCH_DOCTORS,
  GET_AVAILABLE_APPOINTMENTS,
} from './types';

export const fetchDoctors = city => async dispatch => {
  try {
    const {data} = await axios.get(`/doctor?city=${city ?? ''}`, AUTH_HEADER);
    dispatch({type: FETCH_DOCTORS, payload: data.users});
  } catch (err) {
    dispatch({type: FETCH_DOCTORS, payload: []}); // TODO: handle error
    console.error(err);
  }
};

export const getAvailableAppointments = docID => async dispatch => {
  try {
    const {data} = await axios.get(
      `/services/appointment?doctor=${docID}`,
      AUTH_HEADER
    );
    dispatch({type: GET_AVAILABLE_APPOINTMENTS, payload: data.appointments});
  } catch (err) {
    dispatch({type: GET_AVAILABLE_APPOINTMENTS, payload: []}); // TODO: handle error
    console.error(err);
  }
};

export const bookAppointment =
  ({bookingId, batch_code, form, self_booking}, cb) =>
  async dispatch => {
    try {
      const data = {
        batch_code,
        self_booking,
        ...(!self_booking
          ? {...form, age: +form.age, mobile_no: +form.mobile_no}
          : {}),
      };
      await axios.post('/services/appointment', data, AUTH_HEADER);
      dispatch({type: BOOK_APPOINTMENT, payload: bookingId});
      cb?.();
    } catch (err) {
      console.error(err);
    }
  };
