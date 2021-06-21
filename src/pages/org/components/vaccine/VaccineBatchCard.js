import {DeleteIcon} from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Text,
} from '@chakra-ui/react';

export const VaccineBatchCard = ({
  onDelete,
  vaccine: {
    _id,
    info,
    vaccine_date,
    vaccine_doze,
    vaccine_name,
    age_restriction,
    cost,
    booked,
  },
}) => {
  return (
    <Flex
      mb={2}
      justify='space-between'
      align='center'
      key={_id}
      bg='gray.100'
      rounded='sm'
      p={3}>
      <Box>
        <Heading size='md'>
          {vaccine_name} <Badge colorScheme='yellow'>{vaccine_doze} Dose</Badge>{' '}
          <Badge colorScheme={booked ? 'green' : 'red'}>
            {booked ? 'Booked' : 'Not booked'}
          </Badge>
        </Heading>
        <HStack>
          <Text fontSize='sm'>Price: Rs. {cost}</Text>
          <Text fontSize='sm'>
            Age: {age_restriction.min_age} - {age_restriction.max_age}
          </Text>
          <Text fontSize='sm'>Date: {vaccine_date.split('T')[0]}</Text>
        </HStack>
        <Text>{info}</Text>
      </Box>
      <Box>
        {!booked && (
          <IconButton
            onClick={() => onDelete(_id)}
            aria-label='Delete Vaccine'
            icon={<DeleteIcon color='red.600' />}
          />
        )}
      </Box>
    </Flex>
  );
};
