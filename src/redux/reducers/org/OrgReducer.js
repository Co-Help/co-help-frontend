import {
  DEL_ALL_VACCINES,
  DEL_VACCINE_FROM_BATCH,
  FILTER_VACCINE_BATCH,
  GET_ALL_VACCINES,
  GET_VACCINE_BY_BATCH,
  GET_VACCINE_BY_BATCH_FAIL,
  ORG_ADD_BLOOD,
  ORG_ADD_EMERGENCY,
  ORG_DELETE_BED_SERVICES,
  ORG_DELETE_BLOOD,
  ORG_DELETE_BLOOD_TEST_BY_ID,
  ORG_DELETE_BLOOD_TEST_SERVICES,
  ORG_DELETE_EMERGENCY_SERVICE,
  ORG_DELETE_OXYGEN_SERVICES,
  ORG_EDIT_BLOOD,
  ORG_EDIT_EMERGENCY,
  ORG_GET_BEDS_SERVICES,
  ORG_GET_BLOOD_PROVIDE_SERVICES,
  ORG_GET_BLOOD_TEST_BATCH,
  ORG_GET_BLOOD_TEST_SERVICES,
  ORG_GET_EMERGENCY_SERVICES,
  ORG_GET_OXYGEN_SERVICES,
  SET_DONE_UNDONE_VACCINE,
} from '../../actions/org/types';

export const orgVaccineReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_VACCINES: {
      return {vaccines: action.payload};
    }
    case DEL_ALL_VACCINES: {
      return {vaccines: []}; // FIXME: don't remove all items
    }
    case GET_VACCINE_BY_BATCH: {
      return {vaccineBatch: action.payload};
    }
    case GET_VACCINE_BY_BATCH_FAIL: {
      return {vaccineBatchError: action.payload};
    }
    case DEL_VACCINE_FROM_BATCH: {
      return {
        ...state,
        vaccineBatch: state.vaccineBatch.filter(v => v._id !== action.payload),
      };
    }
    case FILTER_VACCINE_BATCH: {
      return {...state, filteredBatch: action.payload};
    }
    case SET_DONE_UNDONE_VACCINE: {
      return {
        ...state,
        vaccineBatch: state.vaccineBatch.map(v =>
          v._id === action.payload ? {...v, done: !v.done} : v
        ),
      };
    }
    default:
      return state;
  }
};

export const orgEmergencyReducer = (state = {}, action) => {
  switch (action.type) {
    case ORG_ADD_EMERGENCY: {
      return {addEmergencySuccess: action.payload};
    }
    case ORG_EDIT_EMERGENCY: {
      return {editEmergencySuccess: action.payload};
    }
    case ORG_GET_EMERGENCY_SERVICES: {
      return {services: action.payload};
    }
    case ORG_DELETE_EMERGENCY_SERVICE: {
      return {services: state.services.filter(s => s._id !== action.payload)};
    }
    default:
      return state;
  }
};

export const orgBloodReducer = (state = {}, action) => {
  switch (action.type) {
    case ORG_ADD_BLOOD: {
      return {...state, addBloodSuccess: action.payload};
    }
    case ORG_EDIT_BLOOD: {
      return {...state, editBloodSuccess: action.payload};
    }
    case ORG_GET_BLOOD_PROVIDE_SERVICES: {
      return {services: action.payload};
    }
    case ORG_DELETE_BLOOD: {
      return {services: state.services.filter(s => s._id !== action.payload)};
    }
    default:
      return state;
  }
};

export const orgOxygenReducer = (state = {}, action) => {
  switch (action.type) {
    case ORG_GET_OXYGEN_SERVICES: {
      return {services: action.payload};
    }
    case ORG_DELETE_OXYGEN_SERVICES: {
      return {
        services: state.services.filter(s => s.batch_code !== action.payload),
      };
    }
    default:
      return state;
  }
};

export const orgBedsReducer = (state = {}, action) => {
  switch (action.type) {
    case ORG_GET_BEDS_SERVICES: {
      return {services: action.payload};
    }
    case ORG_DELETE_BED_SERVICES: {
      return {
        services: state.services.filter(s => s._id !== action.payload),
      };
    }
    default:
      return state;
  }
};

export const orgBloodTestReducer = (state = {}, action) => {
  switch (action.type) {
    case ORG_GET_BLOOD_TEST_SERVICES: {
      return {services: action.payload};
    }
    case ORG_GET_BLOOD_TEST_BATCH: {
      return {...state, batches: action.payload};
    }
    case ORG_DELETE_BLOOD_TEST_SERVICES: {
      return {
        services: state.services.filter(s => s.batch_code !== action.payload),
      };
    }
    case ORG_DELETE_BLOOD_TEST_BY_ID: {
      return {
        ...state,
        batches: state.batches.filter(s => s._id !== action.payload),
      };
    }
    default:
      return state;
  }
};
