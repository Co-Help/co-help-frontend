import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Text,
} from '@chakra-ui/react';

export const VaccineCard = ({
  vaccine: {
    _id,
    info,
    vaccine_date,
    vaccine_doze,
    vaccine_name,
    age_restriction,
    cost,
  },
  isUser,
  onBook,
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
        <Text>{info}</Text>
      </Box>
      {isUser && (
        <Box pl={2}>
          <Button
            rounded='sm'
            size='sm'
            colorScheme='blue'
            variant='outline'
            onClick={onBook}>
            Book
          </Button>
        </Box>
      )}
    </Flex>
  );
};
