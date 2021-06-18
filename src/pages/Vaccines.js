import {Container, Text, useToast} from '@chakra-ui/react';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {AUTH_HEADER, toastOptions} from '../utils';
import {VaccineCard} from './org/components/vaccine/VaccineCard';

export const Vaccines = () => {
  const [vaccines, setVaccines] = useState();
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const bookVaccine = async batch_code => {
    try {
      await axios.post('/services/vaccination', {batch_code}, AUTH_HEADER);
      toast({title: 'Vaccine booked successfully.', ...toastOptions});
    } catch (err) {
      console.error(err);
      toast({title: 'Failed to book.', ...toastOptions, status: 'error'});
    }
  };

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
        <VaccineCard
          key={v._id}
          vaccine={v}
          isUser
          onBook={() => bookVaccine(v.batch_code)}
        />
      ))}
    </Container>
  );
};
