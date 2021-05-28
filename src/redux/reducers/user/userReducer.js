import {LOGIN, LOGOUT} from '../../actions/user/types';

export const userReducer = (state = {profile: null}, action) => {
  switch (action.type) {
    case LOGIN: {
      return {profile: action.payload};
    }

    case LOGOUT: {
      return {profile: null};
    }

    default:
      return state;
  }
};
