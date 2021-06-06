import {COMPLETE_PROFILE, LOGIN, LOGOUT} from '../../actions/user/types';

export const userReducer = (state = {profile: null}, action) => {
  switch (action.type) {
    case LOGIN: {
      return {profile: action.payload};
    }
    case LOGOUT: {
      return {profile: null};
    }
    case COMPLETE_PROFILE: {
      return {profile: {...state.profile, is_profile_completed: true}};
    }
    default:
      return state;
  }
};
