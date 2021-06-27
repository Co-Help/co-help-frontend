import axios from 'axios';
import {AUTH_HEADER} from '../../../utils';
import {
  MARK_NOTIFICATION_READ,
  NOTIFICATION_FETCH_DONE,
  NOTIFICATION_FETCH_FAIL,
} from './types';

export const getNotifications = () => async dispatch => {
  try {
    const {data} = await axios.get('/notification', AUTH_HEADER);
    dispatch({type: NOTIFICATION_FETCH_DONE, payload: data.notifications});
  } catch (err) {
    dispatch({type: NOTIFICATION_FETCH_FAIL});
    console.log(err);
  }
};

export const markAsRead = id => async dispatch => {
  try {
    await axios.put('/notification', {id, read: true}, AUTH_HEADER);
    dispatch({type: MARK_NOTIFICATION_READ, payload: id});
  } catch (err) {
    console.error(err);
  }
};
