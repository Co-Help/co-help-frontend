import {Avatar} from '@chakra-ui/avatar';
import {Box, Center, Container, Heading, Text} from '@chakra-ui/layout';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from '@chakra-ui/react';
import {useSelector} from 'react-redux';
import {BookingsTabPanel} from './components/BookingsTabPanel';
import {OthersTabPanel} from './components/OthersTabPanel';

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
  );
};
