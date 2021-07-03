import {Container} from '@chakra-ui/react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {EmptyMessage} from '../components/EmptyMessage';
import {Loader} from '../components/Loader';
import {getBloodTestServices} from '../redux/actions/user/bloodTestActions';
import {BloodTestCard} from './user/components/BloodTestCard';

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
        <BloodTestCard key={service._id} data={service} />
      ))}
    </Container>
  );
};
