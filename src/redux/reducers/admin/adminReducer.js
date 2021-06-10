import {
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
    default:
      return state;
  }
};
