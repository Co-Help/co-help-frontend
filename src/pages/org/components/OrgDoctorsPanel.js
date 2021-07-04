import {
  Avatar,
  Badge,
  Box,
  Heading,
  HStack,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import {useSelector} from 'react-redux';
import {EmptyMessage} from '../../../components/EmptyMessage';
import {Loader} from '../../../components/Loader';

export const OrgDoctorsPanel = () => {
  const orgInfo = useSelector(state => state.orgInfo);
  const bg = useColorModeValue('gray.200', 'gray.700');

  if (orgInfo.error)
    return <EmptyMessage msg="Couldn't fetch organization information" />;

  return (
    <Box>
      <Stack spacing='3'>
        {orgInfo.loading ? (
          <Loader />
        ) : (
          orgInfo?.doctors.map(({_id, avatar, name, email, doctor_info}) => (
            <HStack key={_id} bg={bg} px='3' py='2' rounded='md'>
              <Avatar name={name} src={avatar} />
              <Stack spacing='0'>
                <Heading fontSize='lg' letterSpacing='wide'>
                  Dr. {name}{' '}
                  <Badge colorScheme='green'>
                    {doctor_info?.active ? 'ACTIVE' : ''}
                  </Badge>
                </Heading>
                <Box>
                  {doctor_info.specialties.map(s => (
                    <Badge colorScheme='blue' key={s}>
                      {s}
                    </Badge>
                  ))}
                </Box>
                <Text opacity='0.9'>{email}</Text>
              </Stack>
              <Spacer />
            </HStack>
          ))
        )}
      </Stack>
    </Box>
  );
};
