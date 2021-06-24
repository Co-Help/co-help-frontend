import {Box, Flex, Heading, Stack, Text} from '@chakra-ui/react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
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
          <Heading>All available appointments</Heading>
          <Text fontSize='lg'>for Dr. {appointments[0]?.doctor.name}</Text>{' '}
        </>
      )}
      <Stack mt={2} spacing={2}>
        {appointments?.map(a => (
          <Flex
            justify='space-between'
            align='center'
            key={a._id}
            bg='gray.100'
            rounded='sm'
            p={3}>
            <Box>
              <Text>{a.info}</Text>
              <Text>Date: {a.appointment_date.split('T')[0]}</Text>
            </Box>
            <BookAppointmentModal a={a} />
          </Flex>
        ))}
      </Stack>
    </Box>
  );
};
