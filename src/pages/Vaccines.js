import {Container, Text} from '@chakra-ui/react';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {AUTH_HEADER} from '../utils';
import {VaccineCard} from './org/components/vaccine/VaccineCard';

export const Vaccines = () => {
  const [vaccines, setVaccines] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('/services/vaccination', AUTH_HEADER)
      .then(({data}) => setVaccines(data.services))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Text>Loading....</Text>;

  return (
    <Container>
      {vaccines?.map(v => (
        <VaccineCard key={v._id} vaccine={v} isUser />
      ))}
    </Container>
  );
};
