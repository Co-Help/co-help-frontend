import axios from 'axios';
import {AUTH_HEADER, parseDateTimeToMilli} from '../../../utils';
import {
  ORG_DELETE_BLOOD_TEST_SERVICES,
  ORG_GET_BLOOD_TEST_BATCH,
  ORG_GET_BLOOD_TEST_SERVICES,
} from './types';

export const getBloodTestServices = () => async dispatch => {
  try {
    const {data} = await axios.get('/org/blood_test', AUTH_HEADER);
    dispatch({type: ORG_GET_BLOOD_TEST_SERVICES, payload: data.services});
  } catch (err) {
    console.error(err);
  }
};

export const setDoneBloodTest = data => async dispatch => {
  try {
    await axios.post('/org/blood_test/done', data, AUTH_HEADER);
    dispatch(getBloodTestByBatch(data.batch_code));
  } catch (err) {
    console.error(err);
  }
};

export const getBloodTestByBatch = batch_code => async dispatch => {
  try {
    const {data} = await axios.get(
      `/org/blood_test/by_batch_code?batch_code=${batch_code}`,
      AUTH_HEADER
    );
    dispatch({type: ORG_GET_BLOOD_TEST_BATCH, payload: data.services});
  } catch (err) {
    console.error(err);
  }
};

export const addBloodTest = (form, cb) => async dispatch => {
  try {
    const data = {
      ...form,
      test_date: parseDateTimeToMilli(form.test_date, form.test_time),
      cost: +form.cost,
      quantity: +form.quantity,
    };
    await axios.post('/org/blood_test', data, AUTH_HEADER);
    cb?.();
    dispatch(getBloodTestServices());
  } catch (err) {
    console.error(err);
  }
};

export const editBloodTest = (form, cb) => async dispatch => {
  try {
    const data = {
      ...form,
      test_date: parseDateTimeToMilli(form.test_date, form.test_time),
      cost: +form.cost,
    };
    await axios.post('/org/blood_test/edit', data, AUTH_HEADER);
    cb?.();
    dispatch(getBloodTestServices());
  } catch (err) {
    console.error(err);
  }
};

export const deleteBloodTest = batch_code => async dispatch => {
  try {
    await axios.delete('/org/blood_test', {...AUTH_HEADER, data: {batch_code}});
    dispatch({type: ORG_DELETE_BLOOD_TEST_SERVICES, payload: batch_code});
  } catch (err) {
    console.error(err);
  }
};
