import {ChevronRightIcon} from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Container,
  IconButton,
  Link,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Link as ReactRouterLink,
  Route,
  Switch,
  useRouteMatch,
} from 'react-router-dom';
import {FloatingLabel} from '../../components/FloatingLabel';
import {Loader} from '../../components/Loader';
import {getAppointments} from '../../redux/actions/doctor/docActions';
import {AddAppointmentModal} from './components/AddAppointmentModal';
import {AppointmentBatchDetails} from './components/AppointmentBatchDetails';

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
    <Container maxW='container.md' pos='relative' minH='85vh'>
      <Switch>
        <Route exact path={path}>
          <Box>
            <Table size='sm' variant='simple'>
              <TableCaption placement='top' fontSize='lg' mb={2}>
                All appointments
              </TableCaption>
              <Thead>
                <Tr>
                  <Th>No.</Th>
                  <Th>Date</Th>
                  <Th isNumeric>Cost</Th>
                  <Th>Info</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {appointments?.map((ap, idx) => (
                  <Tr key={ap._id}>
                    <Td>{idx + 1}</Td>
                    <Td>{ap.appointment_date.split('T')[0]}</Td>
                    <Td isNumeric>{ap.cost}</Td>
                    <Td>{ap.info || 'No info'}</Td>
                    <Td>
                      <Badge colorScheme={ap.booked ? 'green' : 'red'}>
                        {ap.booked ? 'Booked' : 'Not booked'}
                      </Badge>
                    </Td>
                    <Td>
                      <AddAppointmentModal editModal data={ap} />
                      <Link as={ReactRouterLink} to={`${url}/${ap.batch_code}`}>
                        <FloatingLabel label='See all bookings'>
                          <IconButton
                            icon={<ChevronRightIcon fontSize='x-large' />}
                          />
                        </FloatingLabel>
                      </Link>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>

            {!appointments?.length && (
              <Text textAlign='center' mt={15}>
                No appointments available
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
