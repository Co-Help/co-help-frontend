import {Badge, Box, Flex, Heading, HStack, Text} from '@chakra-ui/react';
import {Link as RLink, useRouteMatch} from 'react-router-dom';
import {VaccineBookButton} from './VaccineBookButton';
import {VaccineCancelButton} from './VaccineCancelButton';

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
  showCancelBtn,
}) => {
  const {url} = useRouteMatch();

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
        <RLink to={!isUser ? `${url}/${batch_code}` : '/vaccines'}>
          <Heading size='md'>
            {vaccine_name}{' '}
            <Badge colorScheme='yellow'>{vaccine_doze} Dose</Badge>
          </Heading>
        </RLink>
        <HStack>
          <Text fontSize='sm'>Price: Rs. {cost}</Text>
          <Text fontSize='sm'>
            Age: {age_restriction.min_age} - {age_restriction.max_age}
          </Text>
          <Text fontSize='sm'>Date: {vaccine_date.split('T')[0]}</Text>
        </HStack>
        {isUser && (
          <Text fontSize='sm'>
            Provider: <strong>{org.name}</strong>
          </Text>
        )}
        <Text>{info}</Text>
      </Box>
      {isUser && <VaccineBookButton batch_code={batch_code} />}
      {showCancelBtn && <VaccineCancelButton id={_id} />}
    </Flex>
  );
};
