import {Box, Container, Flex} from '@chakra-ui/react';
import {useSelector} from 'react-redux';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import {Sidebar} from '../../components/Sidebar';
import {getServicesList} from '../../utils';
import {VaccineBatch} from './components/vaccine/VaccineBatch';
import {Doctors} from './Doctors';
import {Emergency} from './Emergency';
import {Vaccination} from './Vaccination';

export const OrgDashboard = () => {
  let {path, url} = useRouteMatch();
  const services = useSelector(state => state.user.profile.org.services);
  const sideBarLinks = getServicesList(services).map(serviceName => ({
    title: serviceName,
    to: `/${serviceName}`,
  }));

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
            <Route path={`${path}/doctor`} component={Doctors} />
            <Route path={`${path}/emergency`} component={Emergency} />
            <Route exact path={`${path}/vaccination`} component={Vaccination} />
            <Route
              path={`${path}/vaccination/:batch_code`}
              component={VaccineBatch}
            />
          </Switch>
        </Box>
      </Flex>
    </Container>
  );
};
