import {Button, Container, Heading, Input, useToast} from '@chakra-ui/react';
import axios from 'axios';
import {useState} from 'react';
import {AUTH_HEADER} from '../../utils';
import {useLogout} from '../../utils/useLogout';

export const JoinAsDoctor = () => {
  const [passKey, setPassKey] = useState('');
  const toast = useToast();
  const logout = useLogout();

  const onJoin = async () => {
    try {
      await axios.post('/doctor/join', {pass_key: passKey}, AUTH_HEADER);
      setTimeout(() => logout(), 3000);
      toast({
        status: 'success',
        position: 'bottom-right',
        description: 'Successfully joined as a doctor, signing out...',
        duration: 3000,
        isClosable: true,
      });
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
        Join As a Doctor
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
