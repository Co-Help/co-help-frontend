import axios from 'axios';
import {AUTH_HEADER} from '../../../utils';
import {
  ORG_ADD_BLOOD,
  ORG_DELETE_BLOOD,
  ORG_EDIT_BLOOD,
  ORG_GET_BLOOD_PROVIDE_SERVICES,
} from './types';

export const getBloodServices = () => async dispatch => {
  try {
    const {data} = await axios.get('/org/blood_provide', AUTH_HEADER);
    dispatch({type: ORG_GET_BLOOD_PROVIDE_SERVICES, payload: data.services});
  } catch (err) {
    console.error(err);
  }
};

export const addBloodService = data => async dispatch => {
  try {
    await axios.post(
      '/org/blood_provide',
      {...data, cost: +data.cost},
      AUTH_HEADER
    );
    dispatch({type: ORG_ADD_BLOOD, payload: true});
    dispatch(getBloodServices());
  } catch (err) {
    dispatch({type: ORG_ADD_BLOOD, payload: false});
    console.error(err);
  }
};

export const editBloodService = data => async dispatch => {
  try {
    // FIXME: marking as not available not working
    await axios.post(
      '/org/blood_provide/edit',
      {...data, cost: +data.cost},
      AUTH_HEADER
    );
    dispatch({type: ORG_EDIT_BLOOD, payload: true});
    dispatch(getBloodServices());
  } catch (err) {
    dispatch({type: ORG_EDIT_BLOOD, payload: false});
    console.error(err);
  }
};

export const deleteBloodService = id => async dispatch => {
  try {
    await axios.delete('/org/blood_provide', {...AUTH_HEADER, data: {id}});
    dispatch({type: ORG_DELETE_BLOOD, payload: id});
  } catch (err) {
    console.error(err);
  }
};
