import {ADD_VACCINE, GET_ALL_VACCINES} from '../../actions/org/types';

export const orgVaccineReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_VACCINE: {
      return {addVaccineSuccess: action.payload};
    }
    case GET_ALL_VACCINES: {
      return {vaccines: action.payload};
    }
    default:
      return state;
  }
};