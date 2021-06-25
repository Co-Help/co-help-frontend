import {USER_FETCH_BLOOD_TESTS} from '../../actions/user/types';

export const bloodTestReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FETCH_BLOOD_TESTS: {
      return {services: action.payload};
    }
    default:
      return state;
  }
};
