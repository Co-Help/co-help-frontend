import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {APP_NAME} from '../constants';
import {orgApplicationsReducer} from './reducers/admin/adminReducer';
import {docAppointmentReducer} from './reducers/doctor/docReducer';
import {notificationReducer} from './reducers/notifications/notificationReducer';
import {
  orgBedsReducer,
  orgBloodReducer,
  orgBloodTestReducer,
  orgEmergencyReducer,
  orgInfoReducer,
  orgOxygenReducer,
  orgVaccineReducer,
} from './reducers/org/OrgReducer';
import {bedsReducer} from './reducers/user/bedsReducer';
import {bloodReducer} from './reducers/user/bloodReducer';
import {bloodTestReducer} from './reducers/user/bloodTestReducer';
import {bookingsReducer} from './reducers/user/bookingsReducer';
import {doctorReducer} from './reducers/user/doctorReducer';
import {emergencyReducer} from './reducers/user/emergencyReducer';
import {oxygenReducer} from './reducers/user/oxygenReducer';
import {orgApplyReducer, userReducer} from './reducers/user/userReducer';
import {vaccinesReducer} from './reducers/user/vaccineReducer';

const reducer = combineReducers({
  user: userReducer,
  orgVaccine: orgVaccineReducer,
  orgEmergency: orgEmergencyReducer,
  orgBlood: orgBloodReducer,
  orgO2: orgOxygenReducer,
  orgBeds: orgBedsReducer,
  orgInfo: orgInfoReducer,
  orgBloodTest: orgBloodTestReducer,
  orgApply: orgApplyReducer,
  orgApplications: orgApplicationsReducer,
  notifications: notificationReducer,
  bookings: bookingsReducer,
  vaccines: vaccinesReducer,
  docAppointment: docAppointmentReducer,
  emergency: emergencyReducer,
  blood: bloodReducer,
  beds: bedsReducer,
  bloodTest: bloodTestReducer,
  oxygen: oxygenReducer,
  doctors: doctorReducer,
});

const middleware = [thunk];
const initialState = {
  user: {
    profile: JSON.parse(localStorage.getItem(`${APP_NAME}_USER_INFO`))?.user,
  },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
