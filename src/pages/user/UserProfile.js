import {Avatar} from '@chakra-ui/avatar';
import {Box, Center, Container, Heading, Text} from '@chakra-ui/layout';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import {useSelector} from 'react-redux';
import {Link as RLink} from 'react-router-dom';
import {BookingsTabPanel} from './components/BookingsTabPanel';
import {OthersTabPanel} from './components/OthersTabPanel';

export const UserProfile = () => {
  const {name, email, avatar, is_profile_completed} = useSelector(
    state => state.user.profile
  );

  return (
    <>
      {!is_profile_completed && (
        <Alert rounded='sm' size='md' status='warning'>
          <AlertIcon />
          <AlertDescription>
            Seems you haven't completed your profile, please complete to get
            better search results
          </AlertDescription>
          <Link ml='auto' as={RLink} to='/user/complete-profile'>
            <Button colorScheme='blackAlpha' size='sm'>
              Complete now
            </Button>
          </Link>
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
