export const userReducer = (state = {userInfo: {}}, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return {userInfo: action.payload};
    }

    case 'LOGOUT': {
      return {
        userInfo: null,
      };
    }

    default:
      return state;
  }
};
