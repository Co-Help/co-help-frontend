import {CheckCircleIcon, DeleteIcon} from '@chakra-ui/icons';
import {
  Box,
  ButtonGroup,
  Container,
  IconButton,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Loader} from '../../components/Loader';
import {getAppointments} from '../../redux/actions/doctor/docActions';
import {AddAppointmentModal} from './components/AddAppointmentModal';

export const DocDashboard = () => {
  const dispatch = useDispatch();
  const {appointments, addAppointmentSuccess} = useSelector(
    state => state.docAppointment
  );
  useEffect(() => {
    dispatch(getAppointments());
  }, [dispatch, addAppointmentSuccess]);

  if (!appointments) return <Loader />;

  return (
    <Container pos='relative' minH='85vh'>
      <Box>
        <Table variant='simple'>
          <TableCaption placement='top'>All appointments</TableCaption>
          <Thead>
            <Tr>
              <Th>No.</Th>
              <Th>Date</Th>
              <Th isNumeric>Cost</Th>
              <Th>Info</Th>
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
                  <ButtonGroup>
                    <IconButton
                      bg='transparent'
                      rounded='full'
                      aria-label='Set Done'
                      title='Set Done'
                      icon={<CheckCircleIcon />}
                    />
                    <IconButton
                      bg='transparent'
                      rounded='full'
                      aria-label='Delete Appointment'
                      title='Delete Appointment'
                      icon={<DeleteIcon color='red.500' />}
                    />
                  </ButtonGroup>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <AddAppointmentModal />
    </Container>
  );
};
