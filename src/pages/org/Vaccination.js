import {Box, Heading} from '@chakra-ui/react';
import {AddVaccineModal} from './components/vaccine/AddVaccineModal';

export const Vaccination = () => {
  return (
    <Box pos='relative' minH='85vh'>
      <Box>
        <Heading size='sm'>Vaccine batches</Heading>
      </Box>
      <AddVaccineModal />
    </Box>
  );
};
