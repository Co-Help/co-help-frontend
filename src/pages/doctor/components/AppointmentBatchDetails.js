import {CheckCircleIcon, DeleteIcon} from '@chakra-ui/icons';
import {IconButton, Td, Text, Tr} from '@chakra-ui/react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {
  deleteAppointment,
  getAppointmentByBatch,
  setAppointmentDone,
} from '../../../redux/actions/doctor/docActions';
import {AppointmentTable} from './AppointmentTable';

export const AppointmentBatchDetails = () => {
  const {batch_code} = useParams();
  const dispatch = useDispatch();
  const appointmentBatch = useSelector(
    state => state.docAppointment.appointmentBatch
  );

  useEffect(() => {
    dispatch(getAppointmentByBatch(batch_code));
  }, [dispatch, batch_code]);

  return (
    <>
      <AppointmentTable title='Appointment details'>
        {appointmentBatch
          ?.filter(ap => !ap.done)
          .map((ap, idx) => (
            <Tr key={ap._id}>
              <Td>{idx + 1}</Td>
              <Td>{ap.appointment_date.split('T')[0]}</Td>
              <Td isNumeric>{ap.cost}</Td>
              <Td>{ap.info || 'No info'}</Td>
              <Td>
                {ap.booked ? (
                  <IconButton
                    onClick={() => dispatch(setAppointmentDone(ap._id))}
                    aria-label='Set done'
                    title='Set done'
                    icon={<CheckCircleIcon />}
                  />
                ) : (
                  <IconButton
                    onClick={() => dispatch(deleteAppointment(ap._id))}
                    aria-label='Delete appointment'
                    title='Delete appointment'
                    icon={<DeleteIcon color='red.500' />}
                  />
                )}
              </Td>
            </Tr>
          ))}
      </AppointmentTable>
      {!appointmentBatch?.length && (
        <Text textAlign='center' mt={15}>
          Nothing here
        </Text>
      )}
    </>
  );
};
