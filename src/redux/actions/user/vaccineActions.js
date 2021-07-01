import axios from 'axios';
import {AUTH_HEADER, formatAadhaarNo} from '../../../utils';
import {GET_ALL_VACCINES, GET_ALL_VACCINES_FAIL} from './types';

export const getAllVaccines = () => async dispatch => {
  try {
    const {data} = await axios.get('/services/vaccination', AUTH_HEADER);
    dispatch({type: GET_ALL_VACCINES, payload: data.services});
  } catch (err) {
    dispatch({type: GET_ALL_VACCINES_FAIL, payload: err.message});
  }
};

export const bookVaccine =
  ({batch_code, form, self_booking}, cb, errCb) =>
  async () => {
    try {
      const data = {
        batch_code,
        self_booking,
        ...(!self_booking
          ? {
              ...form,
              age: +form.age,
              mobile_no: +form.mobile_no,
              aadhar: formatAadhaarNo(form?.aadhar),
            }
          : {}),
      };
      await axios.post('/services/vaccination', data, AUTH_HEADER);
      cb?.();
    } catch (err) {
      errCb?.();
    }
  };
