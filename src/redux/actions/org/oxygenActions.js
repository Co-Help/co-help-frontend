import axios from 'axios';
import {AUTH_HEADER} from '../../../utils';
import {
  ORG_ADD_OXYGEN,
  ORG_DELETE_OXYGEN_SERVICES,
  ORG_GET_OXYGEN_SERVICES,
} from './types';

export const addOxygenService = (form, cb) => async dispatch => {
  try {
    const data = {
      ...form,
      cost: +form.cost,
      capacity: +form.capacity,
      quantity: +form.quantity,
    };
    await axios.post('/org/oxygen_provide', data, AUTH_HEADER);
    dispatch({type: ORG_ADD_OXYGEN, payload: true});
    cb();
    dispatch(getOxygenServices());
  } catch (err) {
    dispatch({type: ORG_ADD_OXYGEN, payload: false});
    console.error(err);
  }
};

export const editOxygenService = (form, cb) => async dispatch => {
  try {
    const data = {...form, cost: +form.cost, capacity: +form.capacity};
    await axios.post('/org/oxygen_provide/edit', data, AUTH_HEADER);
    cb();
    dispatch(getOxygenServices());
  } catch (err) {
    console.error(err);
  }
};

export const getOxygenServices = () => async dispatch => {
  try {
    const {data} = await axios.get('/org/oxygen_provide', AUTH_HEADER);
    dispatch({type: ORG_GET_OXYGEN_SERVICES, payload: data.services});
  } catch (err) {
    console.error(err);
  }
};

export const deleteOxygenService = batch_code => async dispatch => {
  try {
    await axios.delete('/org/oxygen_provide', {
      ...AUTH_HEADER,
      data: {batch_code},
    });
    dispatch({type: ORG_DELETE_OXYGEN_SERVICES, payload: batch_code});
  } catch (err) {
    console.error(err);
  }
};
