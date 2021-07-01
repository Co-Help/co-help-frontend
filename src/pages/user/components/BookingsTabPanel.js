import {ChevronDownIcon, ChevronUpIcon} from '@chakra-ui/icons';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
  Collapse,
  IconButton,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {CallOrgBtn} from '../../../components/CallOrgBtn';
import {CardContainer} from '../../../components/CardContainer';
import {EmptyMessage} from '../../../components/EmptyMessage';
import {Loader} from '../../../components/Loader';
import {getBookedServices} from '../../../redux/actions/user/bookingsAction';
import {formatDate, getLocalTimeFromDate} from '../../../utils';
import {VaccineCard} from '../../org/components/vaccine/VaccineCard';
import {AppointmentCancelBtn} from './AppointmentCancelBtn';
import {BloodTestBookingCancelBtn} from './BloodTestBookingCancelBtn';

const BookingsItem = ({title, children}) => (
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box flex='1' textAlign='left'>
          {title}
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>{children}</AccordionPanel>
  </AccordionItem>
);

const ShowDoneBtn = ({onClick, isShown, title}) => (
  <Center my='3'>
    <Tooltip
      hasArrow
      placement='top'
      label={title || `${isShown ? 'Hide done' : 'Show done'}`}>
      <IconButton
        size='sm'
        rounded='full'
        onClick={onClick}
        icon={
          !isShown ? (
            <ChevronDownIcon fontSize='xl' />
          ) : (
            <ChevronUpIcon fontSize='xl' />
          )
        }
      />
    </Tooltip>
  </Center>
);

export const BookingsTabPanel = () => {
  const dispatch = useDispatch();
  const services = useSelector(state => state.bookings.services);
  const [showDone, setShowDone] = useState(false);

  useEffect(() => {
    dispatch(getBookedServices());
  }, [dispatch]);

  if (!services) return <Loader />;

  return (
    <Accordion allowMultiple defaultIndex={[0]}>
      <BookingsItem title='Vaccines'>
        {/* TODO: add patient name in card */}
        {services?.vaccinations
          .filter(s => !s.done)
          .map(v => (
            <VaccineCard isUser key={v._id} vaccine={v} showCancelBtn />
          ))}
        {!services?.vaccinations.filter(s => !s.done).length && (
          <EmptyMessage msg='No vaccine bookings available' />
        )}
        <ShowDoneBtn isShown={showDone} onClick={() => setShowDone(v => !v)} />
        <Collapse in={showDone} animateOpacity>
          {services?.vaccinations
            .filter(s => s.done)
            .map(v => (
              <VaccineCard isUser key={v._id} vaccine={v} isDone />
            ))}
        </Collapse>
      </BookingsItem>

      <BookingsItem title='Appointments'>
        <Stack spacing={2}>
          {services?.appointments
            .filter(s => !s.done)
            .map(a => (
              <CardContainer key={a._id}>
                <Box mr='auto'>
                  <Text>{a.info}</Text>
                  <Text>
                    Date: {formatDate(a.appointment_date)} &bull; Time:{' '}
                    {getLocalTimeFromDate(a.appointment_date)}
                  </Text>
                  <Text>
                    Address: {a.org.name}, {a.org.address.city}
                  </Text>
                </Box>
                <CallOrgBtn helpline_no={a.org.helpline_no} />
                <AppointmentCancelBtn id={a._id} />
              </CardContainer>
            ))}
          {!services?.appointments.filter(s => !s.done).length && (
            <EmptyMessage msg='No appointments are available' />
          )}
        </Stack>
      </BookingsItem>

      <BookingsItem title='Blood tests'>
        <Stack spacing={2}>
          {services?.blood_tests
            .filter(s => !s.done)
            .map(a => (
              <CardContainer key={a._id}>
                <Box mr='auto'>
                  <Text>{a.info}</Text>
                  <Text>
                    Date: {formatDate(a.test_date)} | Time:{' '}
                    {getLocalTimeFromDate(a.test_date)}
                  </Text>

                  <Text>
                    Address: {a.org.name}, {a.org.address.city}
                  </Text>
                </Box>
                <CallOrgBtn helpline_no={a.org.helpline_no} />
                <BloodTestBookingCancelBtn id={a._id} />
              </CardContainer>
            ))}
        </Stack>
        {!services?.blood_tests.length && (
          <Text textAlign='center'>No blood test bookings available</Text>
        )}
      </BookingsItem>
    </Accordion>
  );
};
