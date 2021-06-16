import {ADD_VACCINE} from '../../actions/org/types';

export const orgVaccineReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_VACCINE: {
      return {addVaccineSuccess: action.payload};
    }
    default:
      return state;
  }
};
