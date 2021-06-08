import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {APP_NAME} from '../constants';
import {orgApplyReducer, userReducer} from './reducers/user/userReducer';

const reducer = combineReducers({
  user: userReducer,
  orgApply: orgApplyReducer,
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
