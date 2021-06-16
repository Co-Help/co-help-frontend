import axios from 'axios';
import {AUTH_HEADER} from '../../../utils';
import {ADD_VACCINE} from './types';

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
