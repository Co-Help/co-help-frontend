import axios from 'axios';
import {getUserCred} from '../../../utils';
import {
  FETCH_ORG_APPLICATIONS_FAIL,
  FETCH_ORG_APPLICATIONS_SUCCESS,
} from './types';

export const fetchOrgApplications = data => async dispatch => {
  try {
    const {access_token} = getUserCred();
    const {data} = await axios.get('/application/requests', {
      headers: {Authorization: `Bearer ${access_token}`},
    });
    dispatch({type: FETCH_ORG_APPLICATIONS_SUCCESS, payload: data?.requests});
  } catch (err) {
    dispatch({
      type: FETCH_ORG_APPLICATIONS_FAIL,
      payload: 'Failed to fetch applications',
    });
    console.error(err);
  }
};
