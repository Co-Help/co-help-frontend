import {USER_FETCH_OXYGEN} from '../../actions/user/types';

export const oxygenReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FETCH_OXYGEN: {
      return {services: action.payload};
    }
    default:
      return state;
  }
};
