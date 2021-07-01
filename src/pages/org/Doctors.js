import {
  Box,
  Button,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import {useState} from 'react';
import {AUTH_HEADER, errorToastOptions, toastOptions} from '../../utils';

export const Doctors = () => {
  const [email, setEmail] = useState('');
  const toast = useToast();

  const onInvite = async () => {
    try {
      await axios.get('/org/generate_pass_key', AUTH_HEADER);
      await axios.post('/doctor/invitation', {email}, AUTH_HEADER);
      toast({...toastOptions, title: 'Invitation sent'});
    } catch (err) {
      toast({...errorToastOptions, title: 'Failed to invite doctor'});
    }
  };

  return (
    <Box>
      <Heading size='sm'>Invite Doctors</Heading>
      <InputGroup mt={2} size='sm'>
        <Input
          value={email}
          onChange={e => setEmail(e.target.value)}
          type='email'
          placeholder="enter doctor's email"
        />
        <InputRightAddon onClick={onInvite} w='5rem'>
          <Button bg='transparent' size='sm'>
            Invite
          </Button>
        </InputRightAddon>
      </InputGroup>
    </Box>
  );
};
