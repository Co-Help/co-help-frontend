import {Badge, Box, Heading, HStack, Text} from '@chakra-ui/react';
import {Link as RLink, useRouteMatch} from 'react-router-dom';
import {CallOrgBtn} from '../../../../components/CallOrgBtn';
import {CardContainer} from '../../../../components/CardContainer';
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
    <CardContainer key={_id}>
      <Box mr='auto'>
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
            Address: {org.name}, {org.address.city}
          </Text>
        )}
        <Text>{info}</Text>
      </Box>
      {isUser && !showCancelBtn && (
        <VaccineBookButton batch_code={batch_code} />
      )}
      {showCancelBtn && (
        <>
          <CallOrgBtn helpline_no={org.helpline_no} />
          <VaccineCancelButton id={_id} />
        </>
      )}
    </CardContainer>
  );
};
