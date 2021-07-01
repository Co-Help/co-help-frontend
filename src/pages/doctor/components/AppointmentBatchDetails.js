import {CheckIcon, CloseIcon, DeleteIcon} from '@chakra-ui/icons';
import {Badge, IconButton, Td, Text, Tr} from '@chakra-ui/react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {FloatingLabel} from '../../../components/FloatingLabel';
import {
  deleteAppointment,
  getAppointmentByBatch,
  setAppointmentDone,
} from '../../../redux/actions/doctor/docActions';
import {formatDate, getLocalTimeFromDate} from '../../../utils';
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
        {appointmentBatch?.map((ap, idx) => (
          <Tr key={ap._id}>
            <Td>{idx + 1}</Td>
            <Td>{ap?.patient_details?.name ?? 'N/A'}</Td>
            <Td isNumeric>{ap?.patient_details?.age ?? 'N/A'}</Td>
            <Td>
              {ap?.booking_time
                ? formatDate(ap?.booking_time) +
                  ' ' +
                  getLocalTimeFromDate(ap?.booking_time)
                : 'N/A'}
            </Td>
            <Td>
              <Badge colorScheme={ap.booked ? 'green' : 'red'}>
                {ap.booked ? 'Booked' : 'Not booked'}
              </Badge>
            </Td>
            <Td>
              {ap.booked && (
                <FloatingLabel label='Set done/undone'>
                  <IconButton
                    onClick={() =>
                      dispatch(setAppointmentDone({id: ap._id, done: !ap.done}))
                    }
                    icon={!ap.done ? <CheckIcon /> : <CloseIcon />}
                  />
                </FloatingLabel>
              )}
              {!ap.booked && (
                <FloatingLabel label='Delete appointment'>
                  <IconButton
                    onClick={() => dispatch(deleteAppointment(ap._id))}
                    icon={<DeleteIcon color='red.500' />}
                  />
                </FloatingLabel>
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
