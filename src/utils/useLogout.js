import {useToast} from '@chakra-ui/react';
import axios from 'axios';
import {useGoogleLogout} from 'react-google-login';
import {useDispatch} from 'react-redux';
import {getUserCred} from '.';
import {logout} from '../redux/actions/user/userActions';

export const useLogout = (reloadWindow = true) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const onLogoutSuccess = async () => {
    try {
      const {refresh_token} = getUserCred();
      await axios.post('/auth/logout', {refresh_token});
      dispatch(logout());
      reloadWindow && window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const onFailure = () => {
    toast({
      description: 'Failed to log out',
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'bottom-right',
    });
  };

  const {signOut} = useGoogleLogout({
    clientId: process.env.REACT_APP_CLIENT_ID,
    onLogoutSuccess,
    onFailure,
  });

  return signOut;
};
