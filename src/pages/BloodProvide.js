import {Container, Text} from '@chakra-ui/react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {EmptyMessage} from '../components/EmptyMessage';
import {Loader} from '../components/Loader';
import {getBloodServices} from '../redux/actions/user/bloodActions';
import {BloodProvideCard} from './user/components/BloodProvideCard';

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
        <BloodProvideCard key={s._id} data={s} />
      ))}
    </Container>
  );
};
