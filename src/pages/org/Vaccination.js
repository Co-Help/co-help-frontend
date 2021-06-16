import {Box, Heading, Stack, Text} from '@chakra-ui/react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getVaccines} from '../../redux/actions/org/OrgAction';
import {AddVaccineModal} from './components/vaccine/AddVaccineModal';
import {VaccineCard} from './components/vaccine/VaccineCard';

export const Vaccination = () => {
  const dispatch = useDispatch();
  const vaccines = useSelector(state => state.orgVaccine.vaccines);
  const addVaccineSuccess = useSelector(
    state => state.orgVaccine.addVaccineSuccess
  );

  useEffect(() => {
    dispatch(getVaccines());
  }, [dispatch, addVaccineSuccess]);

  return (
    <Box pos='relative' minH='85vh'>
      <Box>
        <Heading size='sm'>Vaccine batches</Heading>
        {vaccines?.length ? (
          <Stack spacing={2} mt={3}>
            {vaccines?.map(v => (
              <VaccineCard key={v._id} vaccine={v} />
            ))}
          </Stack>
        ) : (
          <Text textAlign='center' mt={30} fontSize='md'>
            No vaccines are available
          </Text>
        )}
      </Box>
      <AddVaccineModal />
    </Box>
  );
};
