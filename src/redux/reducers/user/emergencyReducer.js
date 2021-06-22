import {GET_EMERGENCY_SERVICES} from '../../actions/user/types';

export const emergencyReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_EMERGENCY_SERVICES: {
      return {services: action.payload};
    }
    default:
      return state;
  }
};
