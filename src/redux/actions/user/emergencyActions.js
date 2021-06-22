import axios from 'axios';
import {AUTH_HEADER} from '../../../utils';
import {GET_EMERGENCY_SERVICES} from './types';

export const getEmergencyServices = city => async dispatch => {
  try {
    const {data} = await axios.get(
      `/services/emergency?city=${city}`,
      AUTH_HEADER
    );
    dispatch({type: GET_EMERGENCY_SERVICES, payload: data.services});
  } catch (err) {
    console.error(err);
  }
};
