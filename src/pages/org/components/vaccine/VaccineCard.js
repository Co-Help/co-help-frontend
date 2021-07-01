import {Badge, Box, Heading, HStack, Text} from '@chakra-ui/react';
import {Link as RLink, useRouteMatch} from 'react-router-dom';
import {CallOrgBtn} from '../../../../components/CallOrgBtn';
import {CardContainer} from '../../../../components/CardContainer';
import {PDFDownloadBtn} from '../../../../components/PDFDownloadBtn';
import {getLocalTimeFromDate} from '../../../../utils';
import {AddVaccineModal} from './AddVaccineModal';
import {VaccineBookButton} from './VaccineBookButton';
import {VaccineCancelButton} from './VaccineCancelButton';

export const VaccineCard = ({vaccine, isUser, showCancelBtn, isDone}) => {
  const {url} = useRouteMatch();
  const {
    _id,
    info,
    vaccine_date,
    vaccine_doze,
    vaccine_name,
    age_restriction,
    cost,
    org,
    batch_code,
  } = vaccine;

  return (
    <CardContainer>
      <Box mr='auto'>
        <RLink to={!isUser ? `${url}/${batch_code}` : '/vaccines'}>
          <Heading size='md'>
            {vaccine_name}{' '}
            <Badge colorScheme='yellow'>{vaccine_doze} Dose</Badge>
          </Heading>
        </RLink>
        <HStack>
          <Text fontSize='sm'>Price: Rs. {cost} &bull;</Text>
          <Text fontSize='sm'>
            Age group: {age_restriction.min_age} - {age_restriction.max_age}
          </Text>
        </HStack>{' '}
        <Text fontSize='sm'>
          Date: {vaccine_date.split('T')[0]} &bull; Time:{' '}
          {getLocalTimeFromDate(vaccine_date)}
        </Text>
        {isUser && (
          <Text fontSize='sm'>
            Address: {org.name}, {org.address.city}
          </Text>
        )}
        <Text>{info}</Text>
      </Box>
      {isUser && !showCancelBtn && !isDone && (
        <>
          <CallOrgBtn helpline_no={org.helpline_no} />
          <VaccineBookButton batch_code={batch_code} />
        </>
      )}
      {showCancelBtn && !isDone && (
        <>
          <CallOrgBtn helpline_no={org.helpline_no} />
          <VaccineCancelButton id={_id} />
        </>
      )}
      {isDone && vaccine && <PDFDownloadBtn data={vaccine} />}
      {!isUser && <AddVaccineModal data={vaccine} editModal />}
    </CardContainer>
  );
};
