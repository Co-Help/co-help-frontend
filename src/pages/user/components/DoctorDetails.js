import {Box, Heading, Stack, Text} from '@chakra-ui/react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {CardContainer} from '../../../components/CardContainer';
import {Loader} from '../../../components/Loader';
import {getAvailableAppointments} from '../../../redux/actions/user/doctorActions';
import {BookAppointmentModal} from './BookAppointmentModal';

export const DoctorDetails = () => {
  const {docId} = useParams();
  const dispatch = useDispatch();

  const {appointments, bookedId} = useSelector(state => state.doctors);

  useEffect(() => {
    dispatch(getAvailableAppointments(docId));
  }, [dispatch, docId, bookedId]);

  if (!appointments) return <Loader />;

  return (
    <Box>
      {!appointments?.length ? (
        <Text textAlign='center' mt={50}>
          Appointments are unavailable!
        </Text>
      ) : (
        <>
          <Heading size='lg' fontWeight='semibold'>
            All available appointments
          </Heading>
          <Text fontSize='lg'>for Dr. {appointments[0]?.doctor.name}</Text>{' '}
        </>
      )}
      <Stack mt={2} spacing={2}>
        {appointments?.map(a => (
          <CardContainer key={a._id}>
            <Box>
              <Text>{a.info}</Text>
              <Text>Date: {a.appointment_date.split('T')[0]}</Text>
            </Box>
            <BookAppointmentModal a={a} />
          </CardContainer>
        ))}
      </Stack>
    </Box>
  );
};
