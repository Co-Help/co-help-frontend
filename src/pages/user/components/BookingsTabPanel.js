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
import {EmptyMessage} from '../../../components/EmptyMessage';
import {Loader} from '../../../components/Loader';
import {VaccineCard2} from '../../../components/VaccineCard2';
import {getBookedServices} from '../../../redux/actions/user/bookingsAction';
import {AppointmentCard} from './AppointmentCard';
import {BloodTestCard} from './BloodTestCard';
import {OxygenCard} from './OxygenCard';

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
  const [showAppointmentDone, setShowAppointmentDone] = useState(false);
  const [showBloodTestDone, setShowBloodTestDone] = useState(false);
  const [showOxygenDone, setShowOxygenDone] = useState(false);

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
            <VaccineCard2 key={v._id} data={v} showCancelBtn />
          ))}
        {!services?.vaccinations.filter(s => !s.done).length && (
          <EmptyMessage msg='No vaccine bookings available' />
        )}
        <ShowDoneBtn isShown={showDone} onClick={() => setShowDone(v => !v)} />
        <Collapse in={showDone} animateOpacity>
          {services?.vaccinations
            .filter(s => s.done)
            .map(v => (
              <VaccineCard2 key={v._id} data={v} isDone />
            ))}
        </Collapse>
      </BookingsItem>

      <BookingsItem title='Appointments'>
        <Stack spacing={2}>
          {services?.appointments
            .filter(s => !s.done)
            .map(a => (
              <AppointmentCard key={a._id} data={a} />
            ))}
          {!services?.appointments.filter(s => !s.done).length && (
            <EmptyMessage msg='No appointments are available' />
          )}
          <ShowDoneBtn
            isShown={showAppointmentDone}
            onClick={() => setShowAppointmentDone(p => !p)}
          />
          <Collapse in={showAppointmentDone} animateOpacity>
            {services?.appointments
              .filter(s => s.done)
              .map(a => (
                <AppointmentCard key={a._id} data={a} isDone />
              ))}
          </Collapse>
        </Stack>
      </BookingsItem>

      <BookingsItem title='Blood tests'>
        <Stack spacing={2}>
          {services?.blood_tests
            .filter(s => !s.done)
            .map(a => (
              <BloodTestCard key={a._id} data={a} showCancelBtn />
            ))}
        </Stack>
        {!services?.blood_tests.filter(s => !s.done).length && (
          <Text textAlign='center'>No blood test bookings available</Text>
        )}
        <ShowDoneBtn
          isShown={showBloodTestDone}
          onClick={() => setShowBloodTestDone(p => !p)}
        />
        <Collapse in={showBloodTestDone} animateOpacity>
          {services?.blood_tests
            .filter(s => s.done)
            .map(a => (
              <BloodTestCard key={a._id} data={a} isDone />
            ))}
        </Collapse>
      </BookingsItem>

      <BookingsItem title='Oxygen'>
        <Stack spacing={2}>
          {services?.oxygen_provides
            .filter(s => !s.done)
            .map(a => (
              <OxygenCard key={a.booking_date} data={a} showCancelBtn />
            ))}
        </Stack>
        {!services?.oxygen_provides.filter(s => !s.done).length && (
          <EmptyMessage msg='No bookings available' />
        )}
        <ShowDoneBtn
          isShown={showOxygenDone}
          onClick={() => setShowOxygenDone(p => !p)}
        />
        <Collapse in={showOxygenDone} animateOpacity>
          {services?.oxygen_provides
            .filter(s => s.done)
            .map(a => (
              <OxygenCard key={a.booking_date} data={a} isDone />
            ))}
        </Collapse>
      </BookingsItem>
    </Accordion>
  );
};
