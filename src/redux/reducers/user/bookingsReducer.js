import {
  CANCEL_APPOINTMENT,
  CANCEL_BLOOD_TEST_BOOKING,
  CANCEL_VACCINE_BOOKING,
  GET_BOOKED_SERVICES,
} from '../../actions/user/types';

export const bookingsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_BOOKED_SERVICES: {
      return {services: action.payload};
    }
    case CANCEL_APPOINTMENT: {
      return {
        services: {
          ...state.services,
          appointments: state.services.appointments.filter(
            a => a._id !== action.payload
          ),
        },
      };
    }
    case CANCEL_BLOOD_TEST_BOOKING: {
      return {
        services: {
          ...state.services,
          blood_tests: state.services.blood_tests.filter(
            a => a._id !== action.payload
          ),
        },
      };
    }
    case CANCEL_VACCINE_BOOKING: {
      return {
        services: {
          ...state.services,
          vaccinations: state.services.vaccinations.filter(
            a => a._id !== action.payload
          ),
        },
      };
    }
    default:
      return state;
  }
};
