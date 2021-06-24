import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Stack,
  Text,
} from '@chakra-ui/react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Loader} from '../../../components/Loader';
import {getBookedServices} from '../../../redux/actions/user/bookingsAction';
import {VaccineCard} from '../../org/components/vaccine/VaccineCard';
import {AppointmentCancelBtn} from './AppointmentCancelBtn';

export const BookingsTabPanel = () => {
  const dispatch = useDispatch();
  const services = useSelector(state => state.bookings.services);

  useEffect(() => {
    dispatch(getBookedServices());
  }, [dispatch]);

  if (!services) return <Loader />;

  return (
    <Accordion allowMultiple defaultIndex={[0]}>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex='1' textAlign='left'>
              Vaccines
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          {services?.vaccinations.map(v => (
            <VaccineCard key={v._id} vaccine={v} showCancelBtn />
          ))}
          {!services?.vaccinations.length && (
            <Text textAlign='center'>No vaccine bookings available</Text>
          )}
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex='1' textAlign='left'>
              Appointments
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Stack spacing={2}>
            {services?.appointments.map(a => (
              <Flex
                justify='space-between'
                align='center'
                key={a._id}
                bg='gray.100'
                rounded='sm'
                p={2}>
                <Box>
                  <Text>{a.info}</Text>
                  <Text>Date: {a.appointment_date.split('T')[0]}</Text>
                </Box>
                <AppointmentCancelBtn id={a._id} />
              </Flex>
            ))}
          </Stack>
          {!services?.appointments.length && (
            <Text textAlign='center'>No appointment bookings available</Text>
          )}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
