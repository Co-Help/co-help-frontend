import {Container, Text} from '@chakra-ui/react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Loader} from '../components/Loader';
import {getOxygenServices} from '../redux/actions/user/oxygenActions';
import {OxygenCard} from './user/components/OxygenCard';

export const Oxygen = () => {
  const dispatch = useDispatch();
  const oxygenServices = useSelector(state => state.oxygen.services);

  useEffect(() => {
    dispatch(getOxygenServices());
  }, [dispatch]);

  if (!oxygenServices) return <Loader />;

  return (
    <Container>
      {!oxygenServices?.length && (
        <Text textAlign='center' mt={50}>
          Oxygen not available!
        </Text>
      )}
      {oxygenServices.map(s => (
        <OxygenCard key={s._id} data={s} />
      ))}
    </Container>
  );
};
