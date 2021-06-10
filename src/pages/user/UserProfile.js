import {Avatar} from '@chakra-ui/avatar';
import {Button} from '@chakra-ui/button';
import {ExternalLinkIcon} from '@chakra-ui/icons';
import {Box, Center, Container, Heading, Link, Text} from '@chakra-ui/layout';
import {Table, Tbody, Td, Th, Thead, Tr} from '@chakra-ui/table';
import {useSelector} from 'react-redux';
import {Link as ReactLink} from 'react-router-dom';

export const UserProfile = () => {
  const {name, email, avatar} = useSelector(state => state.user.profile);

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
      <Link as={ReactLink} to='/org/apply' isExternal>
        Become an Organizer, apply now <ExternalLinkIcon mx='2px' />
      </Link>
      <Button
        size='sm'
        mt={2}
        display='block'
        colorScheme='blue'
        variant='solid'>
        Logout
      </Button>
    </Container>
  );
};
