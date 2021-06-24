import {
  BOOK_APPOINTMENT,
  FETCH_DOCTORS,
  GET_AVAILABLE_APPOINTMENTS,
} from '../../actions/user/types';

export const doctorReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_DOCTORS: {
      return {...state, items: action.payload};
    }
    case GET_AVAILABLE_APPOINTMENTS: {
      return {...state, appointments: action.payload};
    }
    case BOOK_APPOINTMENT: {
      return {...state, bookedId: action.payload};
    }
    default:
      return state;
  }
};
