import {FETCH_BED_SERVICES} from '../../actions/user/types';

export const bedsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_BED_SERVICES: {
      return {services: action.payload};
    }
    default:
      return state;
  }
};
