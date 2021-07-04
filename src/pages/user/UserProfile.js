import {Avatar} from '@chakra-ui/avatar';
import {Box, Center, Container, Heading, Text} from '@chakra-ui/layout';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {BookingsTabPanel} from './components/BookingsTabPanel';
import {OthersTabPanel} from './components/OthersTabPanel';

export const UserProfile = () => {
  const {name, email, avatar, is_profile_completed} = useSelector(
    state => state.user.profile
  );
  const history = useHistory();

  return (
    <>
      {!is_profile_completed && (
        <Alert rounded='sm' size='md' status='warning'>
          <AlertIcon />
          <AlertDescription mr='auto'>
            Your profile is incomplete, please complete to get better search
            results.
          </AlertDescription>
          <Button
            onClick={() => history.push('/user/complete-profile')}
            colorScheme='orange'
            size='sm'>
            Complete now
          </Button>
        </Alert>
      )}
      <Container mt={5} px={5} py={10}>
        <Center py={5} flexDirection='column'>
          <Avatar src={avatar} name={name ?? 'User'} size='2xl' />
          <Heading pt={2}>{name}</Heading>
          <Text>{email}</Text>
        </Center>
        <Box my={5}>
          <Tabs isLazy isFitted>
            <TabList>
              <Tab>Bookings</Tab>
              <Tab>Others</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <BookingsTabPanel />
              </TabPanel>
              <TabPanel>
                <OthersTabPanel />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </>
  );
};
