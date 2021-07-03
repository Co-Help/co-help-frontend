import {
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

export const BloodProvideCard = ({data}) => {
  const {info, group, cost, org} = data;
  const iconColor = useColorModeValue('blue.500', 'blue.200');

  return (
    <CardContainer p='3.5' flexDirection='column' align='start'>
      <HStack mb='1' w='full' justify='space-between'>
        <Stack maxW='80%' spacing='0'>
          <Heading fontSize='2xl' letterSpacing='1px'>
            {group}
          </Heading>
          <Text opacity='0.8'>{info}</Text>
        </Stack>
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

        <CallOrgBtn helpline_no={org.helpline_no} />
      </HStack>
    </CardContainer>
  );
};
