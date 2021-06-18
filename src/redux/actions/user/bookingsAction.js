import axios from 'axios';
import {AUTH_HEADER} from '../../../utils';

export const getBookedVaccines = () => async dispatch => {
  try {
    await axios.get('/services/vaccination/booked', AUTH_HEADER);
  } catch (err) {
    console.error(err);
  }
};
