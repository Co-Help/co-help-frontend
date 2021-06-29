import axios from 'axios';
import {AUTH_HEADER} from '../../../utils';
import {USER_FETCH_BLOOD_TESTS} from './types';

export const getBloodTestServices = () => async dispatch => {
  try {
    const {data} = await axios.get(`/services/blood_test`, AUTH_HEADER);
    dispatch({type: USER_FETCH_BLOOD_TESTS, payload: data.services});
  } catch (err) {
    console.error(err);
  }
};

export const bookBloodTest =
  ({batch_code, form, self_booking}, cb) =>
  async dispatch => {
    try {
      const data = {
        batch_code,
        self_booking,
        ...(!self_booking
          ? {...form, age: +form.age, mobile_no: +form.mobile_no}
          : {}),
      };
      await axios.post('/services/blood_test', data, AUTH_HEADER);
      cb?.();
      dispatch(getBloodTestServices());
    } catch (err) {
      console.error(err);
    }
  };
