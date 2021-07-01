import {
  Badge,
  ButtonGroup,
  Flex,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import {VaccineBookButton} from '../pages/org/components/vaccine/VaccineBookButton';
import {VaccineCancelButton} from '../pages/org/components/vaccine/VaccineCancelButton';
import {getLocalTimeFromDate} from '../utils';
import {CallOrgBtn} from './CallOrgBtn';
import {CardContainer} from './CardContainer';
import {PDFDownloadBtn} from './PDFDownloadBtn';

export const VaccineCard2 = ({data, showCancelBtn, isDone}) => {
  const {
    _id,
    info,
    vaccine_date,
    vaccine_doze,
    vaccine_name,
    age_restriction: {min_age, max_age},
    cost,
    org,
    batch_code,
  } = data;
  const iconColor = useColorModeValue('blue.500', 'blue.200');

  return (
    <CardContainer p='3.5' flexDirection='column' align='start'>
      <HStack w='full' justify='space-between'>
        <Stack spacing='0'>
          <Heading fontSize='2xl' letterSpacing='1px'>
            {vaccine_name}
          </Heading>
          <Text opacity='0.95' fontSize='sm'>
            Age: {min_age} - {max_age} |{' '}
            {new Date(vaccine_date).toDateString().slice(4)} &bull;{' '}
            {getLocalTimeFromDate(vaccine_date)}
          </Text>
        </Stack>
        <Badge colorScheme='yellow' px='3' py='1' rounded='full'>
          {vaccine_doze} dose
        </Badge>
      </HStack>

      <HStack my='1' w='full' justify='space-between' align='center'>
        <Text maxW='80%' opacity='0.8'>
          {info}
        </Text>
        <Heading opacity='0.9' size='lg'>
          <Text mr='1' fontFamily='sans-serif' display='inline' opacity='0.7'>
            ₹
          </Text>
          {cost}
        </Heading>
      </HStack>

      <HStack mt='1' w='full' justify='space-between' align='center'>
        <Flex align='center'>
          <Icon boxSize='7' viewBox='0 0 24 24' color={iconColor}>
            <>
              <path fill='none' d='M0 0h24v24H0z' />
              <path
                d='M18.364 17.364L12 23.728l-6.364-6.364a9 9 0 1 1 12.728 0zM12 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-2a2 2 0 1 1 0-4 2 2 0 0 1 0 4z'
                fill='currentColor'
              />
            </>
          </Icon>
          <Stack ml='2' spacing='0'>
            <Heading fontSize='md'>{org.name}</Heading>
            <Text opacity='0.8' fontSize='sm'>
              {org.address.city}, {org.address.district}
            </Text>
          </Stack>
        </Flex>

        <ButtonGroup>
          <CallOrgBtn helpline_no={org.helpline_no} />
          {!showCancelBtn && !isDone && (
            <VaccineBookButton batch_code={batch_code} />
          )}
          {showCancelBtn && !isDone && <VaccineCancelButton id={_id} />}
          {isDone && data && <PDFDownloadBtn data={data} />}
        </ButtonGroup>
      </HStack>
    </CardContainer>
  );
};
