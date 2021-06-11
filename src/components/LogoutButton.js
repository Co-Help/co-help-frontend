import {Button} from '@chakra-ui/button';
import axios from 'axios';
import {GoogleLogout} from 'react-google-login';
import {useDispatch} from 'react-redux';
import {logout} from '../redux/actions/user/userActions';
import {getUserCred} from '../utils';

export const LogoutButton = () => {
  const dispatch = useDispatch();

  const onSuccess = async () => {
    try {
      const {refresh_token} = getUserCred();
      await axios.post('/auth/logout', {refresh_token});
      dispatch(logout());
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <GoogleLogout
      clientId={process.env.REACT_APP_CLIENT_ID}
      onLogoutSuccess={onSuccess}
      render={p => (
        <Button display='block' rounded='sm' size='sm' colorScheme='red' {...p}>
          Logout
        </Button>
      )}></GoogleLogout>
  );
};
