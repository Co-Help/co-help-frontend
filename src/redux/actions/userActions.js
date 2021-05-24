export const login = () => async dispatch => {
  try {
    dispatch({
      type: 'LOGIN',
      payload: {
        name: 'Nice Name',
        photoUrl: 'https://nicephoto.com',
      },
    });
  } catch (err) {}
};

export const logout = () => async dispatch => {
  console.log('LOGOUT');
  try {
    dispatch({type: 'LOGOUT'});
  } catch (error) {}
};
