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
  orgOxygenReducer,
  orgVaccineReducer,
} from './reducers/org/OrgReducer';
import {bloodReducer} from './reducers/user/bloodReducer';
import {bookingsReducer} from './reducers/user/bookingsReducer';
import {doctorReducer} from './reducers/user/doctorReducer';
import {emergencyReducer} from './reducers/user/emergencyReducer';
import {orgApplyReducer, userReducer} from './reducers/user/userReducer';
import {vaccinesReducer} from './reducers/user/vaccineReducer';

const reducer = combineReducers({
  user: userReducer,
  orgVaccine: orgVaccineReducer,
  orgEmergency: orgEmergencyReducer,
  orgBlood: orgBloodReducer,
  orgO2: orgOxygenReducer,
  beds: orgBedsReducer, //FIXME: beds => orgBeds
  orgBloodTest: orgBloodTestReducer,
  orgApply: orgApplyReducer,
  orgApplications: orgApplicationsReducer,
  notifications: notificationReducer,
  bookings: bookingsReducer,
  vaccines: vaccinesReducer,
  docAppointment: docAppointmentReducer,
  emergency: emergencyReducer,
  blood: bloodReducer,
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
