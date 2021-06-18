import {
  CANCEL_VACCINE_BOOKING,
  GET_BOOKED_VACCINES,
} from '../../actions/user/types';

export const bookingsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_BOOKED_VACCINES: {
      return {vaccines: action.payload};
    }
    case CANCEL_VACCINE_BOOKING: {
      return {vaccines: state.vaccines.filter(v => v._id !== action.payload)};
    }
    default:
      return state;
  }
};
