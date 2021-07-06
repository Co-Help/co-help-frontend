import {Center, Heading} from '@chakra-ui/layout';
import {
  Button,
  Container,
  Image,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {useGoogleLogin} from 'react-google-login';
import {ImGoogle} from 'react-icons/im';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router';
import LoginImage from '../assets/login.png';
import {login} from '../redux/actions/user/userActions';
import {errorToastOptions} from '../utils';

export const Login = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const history = useHistory();
  const userProfile = useSelector(state => state.user.profile);
  const isAdmin = userProfile && userProfile?.role === 'admin';
  const [loading, setLoading] = useState(false);

  const onSuccess = async res => {
    try {
      const {data} = await axios.post('/auth/login', {idToken: res.tokenId});
      if (data?.user) dispatch(login(data));
      window.location.reload();
    } catch (err) {
      toast({
        ...errorToastOptions,
        title:
          err.response.data?.message ||
          'Something went wrong, please try again',
      });
    }
    setLoading(false);
  };

  const onFailure = res => {
    console.log('Login failed: res:', res);
    setLoading(false);
  };

  const {signIn, loaded} = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId: process.env.REACT_APP_CLIENT_ID,
    isSignedIn: true,
    onRequest: () => setLoading(true),
  });

  useEffect(() => {
    if (loaded && userProfile) {
      userProfile.is_profile_completed || isAdmin
        ? history.push('/')
        : history.push('/user/complete-profile');
    }
  }, [userProfile, history, loaded, isAdmin]);

  const bg = useColorModeValue('#FCFDFF', 'gray.800');
  const headingColor = useColorModeValue('gray.600', 'gray.300');
  const btnColor = useColorModeValue('blue.500', 'blue.600');

  return (
    <Container bg={bg} textAlign='center' maxW='container.md'>
      <Heading color={headingColor} size='2xl' lineHeight='shorter'>
        Quickly find and book medical services.
      </Heading>

      <Button
        mt='5'
        isLoading={loading}
        loadingText='signing in...'
        bg={btnColor}
        colorScheme='blue'
        disabled={!loaded || loading}
        onClick={signIn}
        color='white'
        size='lg'
        leftIcon={<ImGoogle color='white' size='20' />}>
        Login with Google
      </Button>
      <Center mt='6'>
        <Image height='350px' src={LoginImage} alt='Login illustration' />
      </Center>
    </Container>
  );
};
