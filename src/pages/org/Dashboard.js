import {Box, Container, Flex} from '@chakra-ui/react';
import {useSelector} from 'react-redux';
import {Redirect, Route, Switch, useRouteMatch} from 'react-router-dom';
import {Loader} from '../../components/Loader';
import {Sidebar} from '../../components/Sidebar';
import {getServicesList} from '../../utils';
import {BedProvide} from './BedProvide';
import {BloodProvide} from './BloodProvide';
import {BloodTest} from './BloodTest';
import {BloodTestDetails} from './components/bloodTest/BloodTestDetails';
import {OxygenDetails} from './components/oxygen/OxygenDetails';
import {VaccineBatch} from './components/vaccine/VaccineBatch';
import {Doctors} from './Doctors';
import {Emergency} from './Emergency';
import {Oxygen} from './Oxygen';
import {Vaccination} from './Vaccination';

export const OrgDashboard = () => {
  let {path, url} = useRouteMatch();
  const services = useSelector(state => state.user.profile.org?.services);

  if (!services) return <Loader />;

  const sideBarLinks = getServicesList(services);
  return (
    <Container maxW='container.lg'>
      <Flex>
        <Sidebar sideBarLinks={sideBarLinks} url={url} />
        <Box flex={3}>
          <Switch>
            <Route exact path={path}>
              <Redirect to={`${path}/vaccination`} />
            </Route>
            {/* TODO: if a org does not provide a service make sure they cant access that route */}
            <Route path={`${path}/doctor_appointment`} component={Doctors} />
            <Route path={`${path}/emergency_provide`} component={Emergency} />
            <Route exact path={`${path}/oxygen_provide`} component={Oxygen} />
            <Route
              path={`${path}/oxygen_provide/:batch_code`}
              component={OxygenDetails}
            />
            <Route path={`${path}/bed_provide`} component={BedProvide} />
            <Route exact path={`${path}/blood_test`} component={BloodTest} />
            <Route
              path={`${path}/blood_test/:batch_code`}
              component={BloodTestDetails}
            />
            <Route path={`${path}/blood_provide`} component={BloodProvide} />
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
