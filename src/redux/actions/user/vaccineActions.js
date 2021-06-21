import axios from 'axios';
import {AUTH_HEADER} from '../../../utils';
import {GET_ALL_VACCINES, GET_ALL_VACCINES_FAIL} from './types';

export const getAllVaccines = () => async dispatch => {
  try {
    const {data} = await axios.get('/services/vaccination', AUTH_HEADER);
    dispatch({type: GET_ALL_VACCINES, payload: data.services});
  } catch (err) {
    dispatch({type: GET_ALL_VACCINES_FAIL, payload: err.message});
  }
};
