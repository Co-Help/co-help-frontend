import {Container, Text} from '@chakra-ui/react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Loader} from '../components/Loader';
import {getAllVaccines} from '../redux/actions/user/vaccineActions';
import {VaccineCard} from './org/components/vaccine/VaccineCard';

export const Vaccines = () => {
  const dispatch = useDispatch();
  const vaccines = useSelector(state => state.vaccines);

  useEffect(() => {
    dispatch(getAllVaccines());
  }, [dispatch]);

  if (vaccines?.error) return <Text>Something went wrong, refresh!</Text>;
  if (!vaccines?.items) return <Loader />;

  return (
    <Container>
      {!vaccines?.items.length && (
        <Text textAlign='center' mt={50}>
          Vaccines are unavailable!
        </Text>
      )}
      {vaccines?.items.map(v => (
        <VaccineCard key={v._id} vaccine={v} isUser />
      ))}
    </Container>
  );
};
