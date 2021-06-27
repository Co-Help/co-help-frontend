import {Box, Container, Text} from '@chakra-ui/react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {Loader} from '../components/Loader';
import {search} from '../redux/actions/user/userActions';
import {BloodProvideCard} from './BloodProvide';
import {BloodTestCard} from './BloodTest';
import {EmergencyCard} from './Emergency';
import {VaccineCard} from './org/components/vaccine/VaccineCard';

export const Search = () => {
  const {text} = useParams();
  const dispatch = useDispatch();
  const searchRes = useSelector(state => state.user.searchRes);

  useEffect(() => {
    dispatch(search(text));
  }, [dispatch, text]);

  if (!searchRes) return <Loader />;

  return (
    <Container>
      <Text>
        Showing search results for <strong>{text}</strong>
      </Text>

      {searchRes?.vaccinations.length ? (
        <Box mt='2.5'>
          <Text>Vaccinations</Text>
          {searchRes?.vaccinations.map(v => (
            <VaccineCard key={v._id} vaccine={v} isUser />
          ))}
        </Box>
      ) : null}

      {searchRes?.blood_tests.length ? (
        <Box mt='2.5'>
          <Text>Blood tests</Text>
          {searchRes?.blood_tests.map(s => (
            <BloodTestCard key={s._id} s={s} />
          ))}
        </Box>
      ) : null}

      {searchRes?.blood_provides.length ? (
        <Box mt='2.5'>
          <Text>Bloods</Text>
          {searchRes?.blood_provides.map(s => (
            <BloodProvideCard key={s._id} s={s} />
          ))}
        </Box>
      ) : null}

      {searchRes?.emergencies.length ? (
        <Box mt='2.5'>
          <Text>Emergencies</Text>
          {searchRes?.emergencies.map(s => (
            <EmergencyCard key={s._id} s={s} />
          ))}
        </Box>
      ) : null}
    </Container>
  );
};
