import axios from 'axios';
import {AUTH_HEADER} from '../../../utils';
import {
  APPROVE_APPLICATION_FAIL,
  APPROVE_APPLICATION_SUCCESS,
  FETCH_ORG_APPLICATIONS_FAIL,
  FETCH_ORG_APPLICATIONS_SUCCESS,
} from './types';

export const fetchOrgApplications = () => async dispatch => {
  try {
    const {data} = await axios.get('/application/requests', AUTH_HEADER);
    dispatch({type: FETCH_ORG_APPLICATIONS_SUCCESS, payload: data?.requests});
  } catch (err) {
    dispatch({
      type: FETCH_ORG_APPLICATIONS_FAIL,
      payload: 'Failed to fetch applications',
    });
    console.error(err);
  }
};

export const approveApplication = applicationId => async dispatch => {
  try {
    await axios.post('/application/approve', {id: applicationId}, AUTH_HEADER);
    dispatch({type: APPROVE_APPLICATION_SUCCESS, payload: applicationId});
  } catch (err) {
    dispatch({
      type: APPROVE_APPLICATION_FAIL,
      payload: 'Failed to approve application',
    });
    console.error(err);
  }
};
