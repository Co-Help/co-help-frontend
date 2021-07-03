import axios from 'axios';
import {AUTH_HEADER} from '../../../utils';
import {FETCH_BED_SERVICES} from './types';

export const getBedServices = city => async dispatch => {
  try {
    const {data} = await axios.get(
      `/services/bed_provide?city=${city}`,
      AUTH_HEADER
    );
    dispatch({type: FETCH_BED_SERVICES, payload: data.services});
  } catch (err) {
    console.error(err);
  }
};
