import {PhoneIcon} from '@chakra-ui/icons';
import {Box, Button, Container, Heading, Text, Tooltip} from '@chakra-ui/react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {CardContainer} from '../components/CardContainer';
import {EmptyMessage} from '../components/EmptyMessage';
import {Loader} from '../components/Loader';
import {getBloodServices} from '../redux/actions/user/bloodActions';

export const BloodProvideCard = ({s}) => (
  <CardContainer>
    <Box>
      <Heading size='md'>{s.group} </Heading>
      <Text fontSize='sm'>Info: {s.info}</Text>
      <Text fontSize='sm'>
        Address:{' '}
        <strong>
          {s.org.name}, {s.org.address.city}
        </strong>
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
  </CardContainer>
);

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
      {!bloodServices?.length ? (
        <EmptyMessage msg='No services are available' />
      ) : null}
      {bloodServices?.map(s => (
        <BloodProvideCard key={s._id} s={s} />
      ))}
    </Container>
  );
};
