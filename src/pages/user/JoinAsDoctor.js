import {Button, Container, Heading, Input, useToast} from '@chakra-ui/react';
import axios from 'axios';
import {useState} from 'react';
import {getUserCred} from '../../utils';

export const JoinAsDoctor = () => {
  const [passKey, setPassKey] = useState('');
  const toast = useToast();

  const onJoin = async () => {
    try {
      const {access_token} = getUserCred();
      await axios.post(
        '/doctor/join',
        {pass_key: passKey},
        {headers: {Authorization: `Bearer ${access_token}`}}
      );
      toast({
        status: 'success',
        position: 'bottom-right',
        description: 'Successfully joined. Please login again.',
        duration: 3000,
        isClosable: true,
      });
      // TODO: logout
    } catch (err) {
      console.error(err);
      toast({
        status: 'error',
        position: 'bottom-right',
        description: 'Failed to join as doctor',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container centerContent mt={20}>
      <Heading size='lg' mb={5}>
        Join As Doctor
      </Heading>
      <Input
        variant='outline'
        placeholder='Enter organization the pass key'
        value={passKey}
        onChange={e => setPassKey(e.target.value)}
      />
      <Button onClick={onJoin} colorScheme='blue' rounded='sm' mt={2}>
        Join Now
      </Button>
    </Container>
  );
};
