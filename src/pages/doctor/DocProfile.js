import {Avatar} from '@chakra-ui/avatar';
import {Center, Container, Heading, Text} from '@chakra-ui/layout';
import {Button, ButtonGroup} from '@chakra-ui/react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {LogoutButton} from '../../components/LogoutButton';
import {AUTH_HEADER} from '../../utils';
import {useLogout} from '../../utils/useLogout';

const leaveDoctorRole = async logout => {
  try {
    await axios.post('/doctor/leave', {}, AUTH_HEADER);
    logout?.();
  } catch (err) {
    console.error(err);
  }
};

export const DocProfile = () => {
  const logout = useLogout();
  const {name, email, avatar} = useSelector(state => state.user.profile);

  return (
    <Container mt={5} px={5} py={10}>
      <Center py={5} flexDirection='column'>
        <Avatar src={avatar} name={name ?? 'User'} size='2xl' />
        <Heading pt={2}>{name}</Heading>
        <Text>{email}</Text>
        {/* TODO: add org details n other stuffs */}
        <ButtonGroup mt={2} size='sm'>
          <LogoutButton />
          <Button
            onClick={() => leaveDoctorRole(logout)}
            rounded='sm'
            colorScheme='red'>
            Leave doctor role
          </Button>
        </ButtonGroup>
      </Center>
    </Container>
  );
};
