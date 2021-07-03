import {Container, Text} from '@chakra-ui/react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Loader} from '../components/Loader';
import {getBedServices} from '../redux/actions/user/bedsActions';
import {BedsCard} from './user/components/BedsCard';

export const Beds = () => {
  const dispatch = useDispatch();
  const bedsServices = useSelector(state => state.beds.services);
  const address = useSelector(state => state.user.profile.address);

  useEffect(() => {
    dispatch(getBedServices(address?.city));
  }, [dispatch, address]);

  if (!bedsServices) return <Loader />;

  return (
    <Container>
      {!bedsServices?.length && (
        <Text textAlign='center' mt={50}>
          Beds not available!
        </Text>
      )}
      {bedsServices.map(s => (
        <BedsCard key={s._id} data={s} />
      ))}
    </Container>
  );
};
