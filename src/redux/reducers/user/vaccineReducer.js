import {
  GET_ALL_VACCINES,
  GET_ALL_VACCINES_FAIL,
} from '../../actions/user/types';

export const vaccinesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_VACCINES: {
      return {items: action.payload};
    }
    case GET_ALL_VACCINES_FAIL: {
      return {error: action.payload};
    }
    default:
      return state;
  }
};
