import {
  APPROVE_APPLICATION_FAIL,
  APPROVE_APPLICATION_SUCCESS,
  FETCH_ORG_APPLICATIONS_FAIL,
  FETCH_ORG_APPLICATIONS_SUCCESS,
} from '../../actions/admin/types';

export const orgApplicationsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ORG_APPLICATIONS_SUCCESS: {
      return {applications: action.payload};
    }
    case FETCH_ORG_APPLICATIONS_FAIL: {
      return {applications: {}, error: action.payload};
    }
    case APPROVE_APPLICATION_SUCCESS: {
      return {
        applications: state.applications.map(a =>
          a._id === action.payload ? {...a, status: 'approved'} : a
        ),
      };
    }
    case APPROVE_APPLICATION_FAIL: {
      return {applications: {}, error: action.payload};
    }
    default:
      return state;
  }
};
