import {Badge, Box, Flex, Heading, HStack, Text} from '@chakra-ui/react';
import {VaccineBookButton} from './VaccineBookButton';

export const VaccineCard = ({
  vaccine: {
    _id,
    info,
    vaccine_date,
    vaccine_doze,
    vaccine_name,
    age_restriction,
    cost,
    org,
    batch_code,
  },
  isUser,
}) => {
  return (
    <Flex
      justify='space-between'
      align='center'
      key={_id}
      bg='gray.200'
      rounded='sm'
      p={3}>
      <Box>
        <Heading size='md'>
          {vaccine_name} <Badge colorScheme='yellow'>{vaccine_doze} Dose</Badge>
        </Heading>
        <HStack>
          <Text fontSize='sm'>Price: Rs. {cost}</Text>
          <Text fontSize='sm'>
            Age: {age_restriction.min_age} - {age_restriction.max_age}
          </Text>
          <Text fontSize='sm'>Date: {vaccine_date.split('T')[0]}</Text>
        </HStack>
        <Text fontSize='sm'>
          Provider: <strong>{org.name}</strong>
        </Text>
        <Text>{info}</Text>
      </Box>
      {isUser && <VaccineBookButton batch_code={batch_code} />}
    </Flex>
  );
};
