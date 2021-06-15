import {Box, Container, Flex} from '@chakra-ui/react';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import {Sidebar} from '../../components/Sidebar';
import {Doctors} from './components/Doctors';

const sideBarLinks = [{title: 'Doctors', to: '/doctors'}];

export const OrgDashboard = () => {
  let {path, url} = useRouteMatch();

  return (
    <Container maxW='container.lg'>
      <Flex>
        <Sidebar sideBarLinks={sideBarLinks} url={url} />
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
