import axios from 'axios';
import {AUTH_HEADER} from '../../../utils';
import {
  ORG_ADD_EMERGENCY,
  ORG_DELETE_EMERGENCY_SERVICE,
  ORG_EDIT_EMERGENCY,
  ORG_GET_EMERGENCY_SERVICES,
} from './types';

export const addEmergencyService = data => async dispatch => {
  try {
    await axios.post(
      '/org/emergency',
      {...data, cost: +data.cost, emergency_no: +data.emergency_no},
      AUTH_HEADER
    );
    dispatch({type: ORG_ADD_EMERGENCY, payload: true});
  } catch (err) {
    dispatch({type: ORG_ADD_EMERGENCY, payload: false});
    console.error(err);
  }
};

export const editEmergencyService = data => async dispatch => {
  try {
    await axios.put(
      '/org/emergency',
      {...data, cost: +data.cost, emergency_no: +data.emergency_no},
      AUTH_HEADER
    );
    dispatch({type: ORG_EDIT_EMERGENCY, payload: true});
  } catch (err) {
    dispatch({type: ORG_EDIT_EMERGENCY, payload: false});
    console.error(err);
  }
};

export const getEmergencyServices = () => async dispatch => {
  try {
    const {data} = await axios.get('/org/emergency', AUTH_HEADER);
    dispatch({type: ORG_GET_EMERGENCY_SERVICES, payload: data.services});
  } catch (err) {
    console.error(err);
  }
};

export const deleteEmergencyService = id => async dispatch => {
  try {
    await axios.delete('/org/emergency', {...AUTH_HEADER, data: {id}});
    dispatch({type: ORG_DELETE_EMERGENCY_SERVICE, payload: id});
  } catch (err) {
    console.error(err);
  }
};
