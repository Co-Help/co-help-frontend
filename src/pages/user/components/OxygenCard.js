import {
  ButtonGroup,
  Flex,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import {CallOrgBtn} from '../../../components/CallOrgBtn';
import {CardContainer} from '../../../components/CardContainer';
import {VaccineCancelButton} from '../../org/components/vaccine/VaccineCancelButton';
import {OxygenBookButton} from './OxygenBookModal';

export const OxygenCard = ({data, showCancelBtn, isDone}) => {
  const {_id, info, cost, org, batch_code, capacity} = data;
  const iconColor = useColorModeValue('blue.500', 'blue.200');

  return (
    <CardContainer p='3.5' flexDirection='column' align='start'>
      <HStack w='full' justify='space-between'>
        <Heading size='md'>Capacity {capacity}</Heading>
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
            <OxygenBookButton batch_code={batch_code} />
          )}
          {showCancelBtn && !isDone && <VaccineCancelButton id={_id} />}
        </ButtonGroup>
      </HStack>
    </CardContainer>
  );
};
