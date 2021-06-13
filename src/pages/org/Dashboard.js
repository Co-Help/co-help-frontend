import {Box, Container, Flex, Link, Stack, Text} from '@chakra-ui/react';
import {
  Link as ReactLink,
  Route,
  Switch,
  useRouteMatch,
} from 'react-router-dom';
import {Doctors} from './components/Doctors';

const sideBarLinks = [{title: 'Doctors', to: '/doctors'}];

export const OrgDashboard = () => {
  let {path, url} = useRouteMatch();

  return (
    <Container maxW='container.lg'>
      <Flex>
        <Box flex={1} mr={5}>
          <Stack>
            {sideBarLinks.map(({title, to}) => (
              <Link
                key={to}
                p={2}
                bg='gray.100'
                rounded='sm'
                as={ReactLink}
                to={url + to}>
                <Text>{title}</Text>
              </Link>
            ))}
          </Stack>
        </Box>
        <Box flex={3}>
          <Switch>
            <Route exact path={path}>
              <div>
                <h3>Dashboard</h3>
              </div>
            </Route>
            <Route path={`${path}/doctors`} component={Doctors} />
          </Switch>
        </Box>
      </Flex>
    </Container>
  );
};
