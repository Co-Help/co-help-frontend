import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Stack,
  Text,
} from '@chakra-ui/react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {CardContainer} from '../../../components/CardContainer';
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
            {services?.appointments
              .filter(s => !s.done)
              .map(a => (
                <CardContainer key={a._id}>
                  <Box>
                    <Text>{a.info}</Text>
                    <Text>Date: {a.appointment_date.split('T')[0]}</Text>
                  </Box>
                  <AppointmentCancelBtn id={a._id} />
                </CardContainer>
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
