import {
  APPLY_FOR_ORG,
  APPLY_FOR_ORG_FAIL,
  COMPLETE_PROFILE,
  LOGIN,
  LOGOUT,
} from '../../actions/user/types';

export const userReducer = (state = {profile: null}, action) => {
  switch (action.type) {
    case LOGIN: {
      return {profile: action.payload};
    }
    case LOGOUT: {
      return {profile: {}};
    }
    case COMPLETE_PROFILE: {
      return {profile: {...state.profile, is_profile_completed: true}};
    }
    default:
      return state;
  }
};

export const orgApplyReducer = (state = {}, action) => {
  switch (action.type) {
    case APPLY_FOR_ORG: {
      return {...state, orgApplySuccess: true};
    }
    case APPLY_FOR_ORG_FAIL: {
      return {...state, error: action.payload ?? 'Something went wrong'};
    }
    default:
      return state;
  }
};
