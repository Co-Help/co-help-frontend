import {
  APPLY_FOR_ORG,
  APPLY_FOR_ORG_FAIL,
  COMPLETE_PROFILE,
  FETCH_PROFILE,
  LOGIN,
  LOGOUT,
  SEARCH,
  UPDATE_DOCTOR_INFO,
} from '../../actions/user/types';

export const userReducer = (state = {profile: null}, action) => {
  switch (action.type) {
    case LOGIN:
    case FETCH_PROFILE: {
      return {...state, profile: action.payload};
    }
    case LOGOUT: {
      return {profile: {}};
    }
    case COMPLETE_PROFILE: {
      return {
        ...state,
        profile: {...state.profile, is_profile_completed: true},
      };
    }
    case SEARCH: {
      return {...state, searchRes: action.payload};
    }
    case UPDATE_DOCTOR_INFO: {
      return {
        ...state,
        profile: {
          ...state.profile,
          doctor_info: {...state.profile.doctor_info, ...action.payload},
        },
      };
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
