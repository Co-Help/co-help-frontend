import axios from 'axios';
import {AUTH_HEADER} from '../../../utils';
import {ORG_DELETE_BED_SERVICES, ORG_GET_BEDS_SERVICES} from './types';

export const getBedsServices = () => async dispatch => {
  try {
    const {data} = await axios.get('/org/bed_provide', AUTH_HEADER);
    dispatch({type: ORG_GET_BEDS_SERVICES, payload: data.services});
  } catch (err) {
    console.error(err);
  }
};

export const addBedService = (form, cb) => async dispatch => {
  try {
    const data = {
      ...form,
      cost: +form.cost,
      total_beds: +form.total_beds,
      available_beds: +form.available_beds,
    };
    await axios.post('/org/bed_provide', data, AUTH_HEADER);
    cb();
    dispatch(getBedsServices());
  } catch (err) {
    console.error(err);
  }
};

export const editBedService = (form, cb) => async dispatch => {
  try {
    // FIXME: mark as not available not working
    const data = {
      ...form,
      cost: +form.cost,
      total_beds: +form.total_beds,
      available_beds: +form.available_beds,
    };
    await axios.post('/org/bed_provide/edit', data, AUTH_HEADER);
    cb();
    dispatch(getBedsServices());
  } catch (err) {
    console.error(err);
  }
};

export const deleteBedService = id => async dispatch => {
  try {
    await axios.delete('/org/bed_provide', {
      ...AUTH_HEADER,
      data: {id},
    });
    dispatch({type: ORG_DELETE_BED_SERVICES, payload: id});
  } catch (err) {
    console.error(err);
  }
};
