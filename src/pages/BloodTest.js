import {Box, Container, Heading, HStack, Text} from '@chakra-ui/react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {CardContainer} from '../components/CardContainer';
import {Loader} from '../components/Loader';
import {getBloodTestServices} from '../redux/actions/user/bloodTestActions';
import {formatDate} from '../utils';
import {BookBloodTestModal} from './user/components/BookBloodTestModal';

export const BloodTest = () => {
  const dispatch = useDispatch();
  const bloodTestServices = useSelector(state => state.bloodTest.services);

  useEffect(() => {
    dispatch(getBloodTestServices());
  }, [dispatch]);

  if (!bloodTestServices) return <Loader />;

  return (
    <Container>
      {bloodTestServices?.map(s => (
        <CardContainer key={s._id}>
          <Box>
            <Heading size='md'>{s.info} </Heading>
            <Text fontSize='sm'>
              by <strong>{s.org.name}</strong>
            </Text>
            <HStack>
              <Text fontSize='sm'>Date: {formatDate(s.test_date)}</Text>
              <Text fontSize='sm'>Price: Rs. {s.cost}</Text>
            </HStack>
          </Box>
          <BookBloodTestModal data={s} />
        </CardContainer>
      ))}
    </Container>
  );
};
