import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {APP_NAME} from '../constants';
import {orgApplicationsReducer} from './reducers/admin/adminReducer';
import {notificationReducer} from './reducers/notifications/notificationReducer';
import {orgVaccineReducer} from './reducers/org/OrgReducer';
import {bookingsReducer} from './reducers/user/bookingsReducer';
import {orgApplyReducer, userReducer} from './reducers/user/userReducer';

const reducer = combineReducers({
  user: userReducer,
  orgVaccine: orgVaccineReducer,
  orgApply: orgApplyReducer,
  orgApplications: orgApplicationsReducer,
  notifications: notificationReducer,
  bookings: bookingsReducer,
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
