import axios from 'axios';
import {AUTH_HEADER} from '../../../utils';
import {ADD_VACCINE, DEL_ALL_VACCINES, GET_ALL_VACCINES} from './types';

export const addVaccine = data => async dispatch => {
  try {
    await axios.post(
      '/org/vaccination',
      {
        ...data,
        vaccine_date: new Date(data.vaccine_date).getTime().toString(),
        cost: +data.cost,
        quantity: +data.quantity,
        min_age: +data.min_age,
        max_age: +data.max_age,
      },
      AUTH_HEADER
    );
    dispatch({type: ADD_VACCINE, payload: true});
  } catch (err) {
    dispatch({type: ADD_VACCINE, payload: false});
    console.error(err);
  }
};

export const getVaccines = () => async dispatch => {
  try {
    const {data} = await axios.get('/org/vaccination', AUTH_HEADER);
    dispatch({type: GET_ALL_VACCINES, payload: data?.services});
  } catch (err) {
    console.error(err);
  }
};

export const deleteVaccines = () => async dispatch => {
  try {
    await axios.delete('/org/vaccination', AUTH_HEADER);
    dispatch({type: DEL_ALL_VACCINES});
  } catch (err) {
    console.error(err);
  }
};
