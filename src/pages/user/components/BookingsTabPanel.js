import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getBookedVaccines} from '../../../redux/actions/user/bookingsAction';
import {VaccineCard} from '../../org/components/vaccine/VaccineCard';

export const BookingsTabPanel = () => {
  const dispatch = useDispatch();
  const vaccines = useSelector(state => state.bookings.vaccines);

  useEffect(() => {
    dispatch(getBookedVaccines());
  }, [dispatch]);

  return (
    <div>
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
            {vaccines?.map(v => (
              <VaccineCard key={v._id} vaccine={v} showCancelBtn />
            ))}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
