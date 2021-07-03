import {Box, Container, Text} from '@chakra-ui/react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect, useParams} from 'react-router-dom';
import {Loader} from '../components/Loader';
import {VaccineCard2} from '../components/VaccineCard2';
import {search} from '../redux/actions/user/userActions';
import {BedsCard} from './user/components/BedsCard';
import {BloodProvideCard} from './user/components/BloodProvideCard';
import {BloodTestCard} from './user/components/BloodTestCard';
import {EmergencyCard} from './user/components/EmergencyCard';
import {OxygenCard} from './user/components/OxygenCard';

export const Search = () => {
  const {text} = useParams();
  const dispatch = useDispatch();
  const searchRes = useSelector(state => state.user.searchRes);
  const profile = useSelector(state => state.user.profile);

  useEffect(() => {
    dispatch(search(text));
  }, [dispatch, text]);

  if (!profile) return <Redirect to='/login' />;
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
            <VaccineCard2 key={v._id} data={v} />
          ))}
        </Box>
      ) : null}

      {searchRes?.blood_tests.length ? (
        <Box mt='2.5'>
          <Text>Blood tests</Text>
          {searchRes?.blood_tests.map(s => (
            <BloodTestCard key={s._id} data={s} />
          ))}
        </Box>
      ) : null}

      {searchRes?.blood_provides.length ? (
        <Box mt='2.5'>
          <Text>Bloods</Text>
          {searchRes?.blood_provides.map(s => (
            <BloodProvideCard key={s._id} data={s} />
          ))}
        </Box>
      ) : null}

      {searchRes?.emergencies.length ? (
        <Box mt='2.5'>
          <Text>Emergencies</Text>
          {searchRes?.emergencies.map(s => (
            <EmergencyCard key={s._id} data={s} />
          ))}
        </Box>
      ) : null}

      {searchRes?.bed_provides.length ? (
        <Box mt='2.5'>
          <Text>Beds</Text>
          {searchRes?.bed_provides.map(s => (
            <BedsCard key={s._id} data={s} />
          ))}
        </Box>
      ) : null}

      {searchRes?.oxygen_provides.length ? (
        <Box mt='2.5'>
          <Text>Oxygen</Text>
          {searchRes?.oxygen_provides.map(s => (
            <OxygenCard key={s._id} data={s} />
          ))}
        </Box>
      ) : null}
    </Container>
  );
};
