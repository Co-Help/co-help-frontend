import {
  ADD_APPOINTMENT_SUCCESS,
  GET_APPOINTMENTS,
} from '../../actions/doctor/types';

export const docAppointmentReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_APPOINTMENT_SUCCESS: {
      return {addAppointmentSuccess: action.payload};
    }
    case GET_APPOINTMENTS: {
      return {appointments: action.payload};
    }
    default:
      return state;
  }
};
