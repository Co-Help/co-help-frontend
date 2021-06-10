import {Avatar} from '@chakra-ui/avatar';
import {Button} from '@chakra-ui/button';
import {ExternalLinkIcon} from '@chakra-ui/icons';
import {Box, Center, Container, Heading, Link, Text} from '@chakra-ui/layout';
import {Table, Tbody, Td, Th, Thead, Tr} from '@chakra-ui/table';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {GoogleLogout} from 'react-google-login';
import {useDispatch, useSelector} from 'react-redux';
import {Link as ReactLink} from 'react-router-dom';
import {logout} from '../../redux/actions/user/userActions';
import {getUserCred} from '../../utils';

const getApplicationStatus = async () => {
  const {access_token} = getUserCred();
  try {
    const {data} = await axios.get('/application', {
      headers: {Authorization: `Bearer ${access_token}`},
    });
    return data?.application;
  } catch (err) {
    console.error(err);
  }
};

export const UserProfile = () => {
  const {name, email, avatar} = useSelector(state => state.user.profile);
  const [applicationStatus, setApplicationStatus] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    getApplicationStatus().then(application =>
      setApplicationStatus(application?.status)
    );
  }, []);

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
    <Container mt={5} px={5} py={10}>
      <Center py={5} flexDirection='column'>
        <Avatar src={avatar} name={name ?? 'User'} size='2xl' />
        <Heading pt={2}>{name}</Heading>
        <Text>{email}</Text>
      </Center>
      <Box my={5}>
        <Heading fontSize='md'>Your bookings</Heading>
        <Table my={3} size='sm'>
          <Thead>
            <Tr>
              <Th>No.</Th>
              <Th>Service</Th>
              <Th>Date</Th>
              <Th isNumeric>Price</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>1</Td>
              <Td>Oxygen</Td>
              <Td>05 Jun, 2021</Td>
              <Td isNumeric>550.0</Td>
            </Tr>
            <Tr>
              <Td>2</Td>
              <Td>Doctor Appointment</Td>
              <Td>21 Mar, 2021</Td>
              <Td isNumeric>700.0</Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
      {applicationStatus ? (
        <Text>
          Your application is still under process, please wait for confirmation
          email.
        </Text>
      ) : (
        <Link as={ReactLink} to='/org/apply' isExternal>
          Become an Organizer, apply now <ExternalLinkIcon mx='2px' />
        </Link>
      )}

      <GoogleLogout
        clientId={process.env.REACT_APP_CLIENT_ID}
        icon={false}
        onLogoutSuccess={onSuccess}
        render={p => (
          <Button
            display='block'
            rounded='sm'
            size='sm'
            mt={3}
            colorScheme='red'
            {...p}>
            Logout
          </Button>
        )}></GoogleLogout>
    </Container>
  );
};
