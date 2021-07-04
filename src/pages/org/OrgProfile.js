import {Avatar} from '@chakra-ui/avatar';
import {Center, Container, Heading, Text} from '@chakra-ui/layout';
import {Box, Tab, TabList, TabPanel, TabPanels, Tabs} from '@chakra-ui/react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {LogoutButton} from '../../components/LogoutButton';
import {fetchOrgInfo} from '../../redux/actions/org/OrgAction';
import {OrgDoctorsPanel} from './components/OrgDoctorsPanel';
import {OrgMembersPanel} from './components/OrgMembersPanel';

export const OrgProfile = () => {
  const {avatar, org} = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrgInfo());
  }, [dispatch]);

  return (
    <Container mt={5} px={5} py={10}>
      <Center py={5} flexDirection='column'>
        <Avatar
          src={org?.logo_url ?? avatar}
          name={org.name ?? 'User'}
          size='2xl'
        />
        <Heading pt={2}>{org.name}</Heading>
        <Text mb={2}>{org.info}</Text>
        <LogoutButton />
      </Center>
      <Box>
        <Tabs isLazy isFitted>
          <TabList>
            <Tab>Members</Tab>
            <Tab>Doctors</Tab>
          </TabList>

          <TabPanels pos='relative'>
            <TabPanel>
              <OrgMembersPanel />
            </TabPanel>
            <TabPanel>
              <OrgDoctorsPanel />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};
