import {BOOK_VACCINE, GET_BOOKED_VACCINES} from '../../actions/user/types';

export const bookingsReducer = (state = {vaccine: {}}, action) => {
  switch (action.type) {
    case GET_BOOKED_VACCINES: {
      return {vaccine: {}};
    }
    case BOOK_VACCINE: {
      return {};
    }
    default:
      return state;
  }
};
