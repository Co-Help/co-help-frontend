import {Button} from '@chakra-ui/button';
import {Box, Flex, Heading, Text} from '@chakra-ui/layout';
import {useColorModeValue, useToast} from '@chakra-ui/react';
import axios from 'axios';
import {useEffect} from 'react';
import {useGoogleLogin} from 'react-google-login';
import {ImGoogle} from 'react-icons/im';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router';
import {login} from '../redux/actions/user/userActions';
import {errorToastOptions} from '../utils';

export const Login = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const history = useHistory();
  const userProfile = useSelector(state => state.user.profile);
  const isAdmin = userProfile && userProfile?.role === 'admin';

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
  };

  const onFailure = res => {
    console.log('Login failed: res:', res);
  };

  const {signIn, loaded} = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId: process.env.REACT_APP_CLIENT_ID,
    isSignedIn: true,
  });

  useEffect(() => {
    if (loaded && userProfile) {
      userProfile.is_profile_completed || isAdmin
        ? history.push('/')
        : history.push('/user/complete-profile');
    }
  }, [userProfile, history, loaded, isAdmin]);

  const bg = useColorModeValue('#FCFDFF', 'gray.800');
  const bg2 = useColorModeValue('#DBE2EF', 'gray.600');

  return (
    <Flex bg={bg2} minH='100vh' minW='full'>
      <Flex
        justify='center'
        align='center'
        bg={bg}
        boxShadow='lg'
        flex={1}
        p={5}>
        <Button
          disabled={!loaded}
          onClick={signIn}
          bg='#3F72AF'
          _hover={{background: '#3F72AF'}}
          p={6}
          color='white'
          leftIcon={<ImGoogle color='white' size='20' />}>
          Login with Google
        </Button>
      </Flex>

      <Box display={['none', 'block']} p={5} py={10} flex={1}>
        <Heading>Co-Help</Heading>
        <Text fontSize='xl'>
          Find doctors, beds, oxygen and other medical needs.
        </Text>
      </Box>
    </Flex>
  );
};
