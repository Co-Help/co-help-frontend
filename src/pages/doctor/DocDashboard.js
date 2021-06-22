import {ChevronRightIcon} from '@chakra-ui/icons';
import {Box, Container, IconButton, Link, Td, Text, Tr} from '@chakra-ui/react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Link as ReactRouterLink,
  Route,
  Switch,
  useRouteMatch,
} from 'react-router-dom';
import {Loader} from '../../components/Loader';
import {getAppointments} from '../../redux/actions/doctor/docActions';
import {AddAppointmentModal} from './components/AddAppointmentModal';
import {AppointmentBatchDetails} from './components/AppointmentBatchDetails';
import {AppointmentTable} from './components/AppointmentTable';

export const DocDashboard = () => {
  const dispatch = useDispatch();
  let {path, url} = useRouteMatch();

  const {appointments, addAppointmentSuccess} = useSelector(
    state => state.docAppointment
  );
  useEffect(() => {
    dispatch(getAppointments());
  }, [dispatch, addAppointmentSuccess]);

  if (!appointments) return <Loader />;

  return (
    <Container pos='relative' minH='85vh'>
      <Switch>
        <Route exact path={path}>
          <Box>
            <AppointmentTable title='All appointments'>
              {appointments?.map((ap, idx) => (
                <Tr key={ap._id}>
                  <Td>{idx + 1}</Td>
                  <Td>{ap.appointment_date.split('T')[0]}</Td>
                  <Td isNumeric>{ap.cost}</Td>
                  <Td>{ap.info || 'No info'}</Td>
                  <Td>
                    <Link as={ReactRouterLink} to={`${url}/${ap.batch_code}`}>
                      <IconButton
                        aria-label='View all appointments'
                        title='View all appointments'
                        icon={<ChevronRightIcon fontSize='x-large' />}
                      />
                    </Link>
                  </Td>
                </Tr>
              ))}
            </AppointmentTable>
            {!appointments?.length && (
              <Text textAlign='center' mt={15}>
                Nothing here
              </Text>
            )}
          </Box>
          <AddAppointmentModal />
        </Route>
        <Route
          path={`${path}/:batch_code`}
          component={AppointmentBatchDetails}
        />
      </Switch>
    </Container>
  );
};
