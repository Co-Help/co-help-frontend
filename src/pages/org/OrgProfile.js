import {Avatar} from '@chakra-ui/avatar';
import {Center, Container, Heading, Text} from '@chakra-ui/layout';
import {useSelector} from 'react-redux';
import {LogoutButton} from '../../components/LogoutButton';

export const OrgProfile = () => {
  const {name, email, avatar} = useSelector(state => state.user.profile);

  return (
    <Container mt={5} px={5} py={10}>
      <Center py={5} flexDirection='column'>
        <Avatar src={avatar} name={name ?? 'User'} size='2xl' />
        <Heading pt={2}>{name}</Heading>
        <Text>{email}</Text>
        {/* TODO: add org details n other stuffs */}
        <LogoutButton />
      </Center>
    </Container>
  );
};
