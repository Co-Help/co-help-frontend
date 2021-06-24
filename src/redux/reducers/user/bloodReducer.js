import {GET_BLOOD_SERVICES} from '../../actions/user/types';

export const bloodReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_BLOOD_SERVICES: {
      return {services: action.payload};
    }
    default:
      return state;
  }
};
