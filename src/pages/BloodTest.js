import {Box, Container, Heading, HStack, Text} from '@chakra-ui/react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {CallOrgBtn} from '../components/CallOrgBtn';
import {CardContainer} from '../components/CardContainer';
import {EmptyMessage} from '../components/EmptyMessage';
import {Loader} from '../components/Loader';
import {getBloodTestServices} from '../redux/actions/user/bloodTestActions';
import {formatDate} from '../utils';
import {BookBloodTestModal} from './user/components/BookBloodTestModal';

export const BloodTestCard = ({s}) => (
  <CardContainer>
    <Box mr='auto'>
      <Heading size='md'>{s.info} </Heading>
      <Text fontSize='sm'>
        Address:{' '}
        <strong>
          {s.org.name}, {s.org.address.city}
        </strong>
      </Text>
      <HStack>
        <Text fontSize='sm'>Date: {formatDate(s.test_date)}</Text>
        <Text fontSize='sm'>Price: Rs. {s.cost}</Text>
      </HStack>
    </Box>
    <CallOrgBtn helpline_no={s.org.helpline_no} />
    <BookBloodTestModal data={s} />
  </CardContainer>
);

export const BloodTest = () => {
  const dispatch = useDispatch();
  const bloodTestServices = useSelector(state => state.bloodTest.services);

  useEffect(() => {
    dispatch(getBloodTestServices());
  }, [dispatch]);

  if (!bloodTestServices) return <Loader />;

  return (
    <Container>
      {!bloodTestServices?.length ? (
        <EmptyMessage msg='No bookings available' />
      ) : null}
      {bloodTestServices?.map(service => (
        <BloodTestCard key={service._id} s={service} />
      ))}
    </Container>
  );
};
