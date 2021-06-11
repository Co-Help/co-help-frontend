import axios from 'axios';
import {getUserCred} from '../../../utils';
import {
  MARK_NOTIFICATION_READ,
  NOTIFICATION_FETCH_DONE,
  NOTIFICATION_FETCH_FAIL,
} from './types';

export const getNotifications = () => async dispatch => {
  try {
    const {access_token} = getUserCred();
    const {data} = await axios.get('/notification', {
      headers: {Authorization: `Bearer ${access_token}`},
    });
    dispatch({type: NOTIFICATION_FETCH_DONE, payload: data.notifications});
  } catch (err) {
    dispatch({type: NOTIFICATION_FETCH_FAIL});
    console.log(err);
  }
};

export const markAsRead = id => async dispatch => {
  try {
    const {access_token} = getUserCred();
    await axios.put(
      '/notification',
      {id, read: true},
      {headers: {Authorization: `Bearer ${access_token}`}}
    );
    dispatch({type: MARK_NOTIFICATION_READ, payload: id});
  } catch (err) {
    console.error(err);
  }
};
