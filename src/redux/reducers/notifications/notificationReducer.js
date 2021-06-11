import {
  MARK_NOTIFICATION_READ,
  NOTIFICATION_FETCH_DONE,
  NOTIFICATION_FETCH_FAIL,
} from '../../actions/notifications/types';

export const notificationReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTIFICATION_FETCH_DONE: {
      return {items: action.payload};
    }
    case NOTIFICATION_FETCH_FAIL: {
      return {error: 'Failed to fetch notification'};
    }
    case MARK_NOTIFICATION_READ: {
      return {
        items: state.items.map(n =>
          n._id === action.payload ? {...n, read: true} : n
        ),
      };
    }
    default:
      return state;
  }
};
