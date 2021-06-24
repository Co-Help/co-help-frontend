import {PhoneIcon} from '@chakra-ui/icons';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Loader} from '../components/Loader';
import {getBloodServices} from '../redux/actions/user/bloodActions';

export const BloodProvide = () => {
  const dispatch = useDispatch();
  const {address} = useSelector(state => state.user.profile);
  const bloodServices = useSelector(state => state.blood.services);

  useEffect(() => {
    dispatch(getBloodServices(address?.city));
  }, [dispatch, address]);

  if (!bloodServices) return <Loader />;

  return (
    <Container>
      <Text fontSize='md' my={2}>
        List of organization providing blood in <strong>{address?.city}</strong>
      </Text>
      {bloodServices?.map(s => (
        <Flex
          key={s._id}
          mb={2}
          justify='space-between'
          align='center'
          bg='gray.100'
          rounded='sm'
          p={3}>
          <Box>
            <Heading size='md'>{s.group} </Heading>
            <Text fontSize='sm'>
              by <strong>{s.org.name}</strong>
            </Text>
            <Text fontSize='sm'>Price: Rs. {s.cost}</Text>
          </Box>
          <Tooltip
            hasArrow
            placement='top'
            label={s.org.helpline_no}
            aria-label='Emergency number'>
            <Button
              leftIcon={<PhoneIcon />}
              colorScheme='blue'
              variant='solid'
              size='sm'
              rounded='sm'
              isDisabled={!s.available}>
              Call us
            </Button>
          </Tooltip>
        </Flex>
      ))}
    </Container>
  );
};
