import {
  Box,
  Button,
  Checkbox,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import {useState} from 'react';
import {getUserCred} from '../../../utils';

export const Doctors = () => {
  const [genKey, setGenKey] = useState(true);
  const [email, setEmail] = useState('');
  const toast = useToast();

  const onInvite = async () => {
    try {
      const {access_token} = getUserCred();
      if (genKey) {
        await axios.get('/org/generate_pass_key', {
          headers: {Authorization: `Bearer ${access_token}`},
        });
      }
      await axios.post(
        '/doctor/invitation',
        {email},
        {headers: {Authorization: `Bearer ${access_token}`}}
      );
      toast({
        status: 'success',
        position: 'bottom-right',
        description: 'Invitation sent',
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.error(err);
      toast({
        status: 'error',
        position: 'bottom-right',
        description: 'Failed to invite doctor',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
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
            <Button size='sm'>Invite</Button>
          </InputRightAddon>
        </InputGroup>
        <Checkbox
          mt={2}
          isChecked={genKey}
          onChange={e => setGenKey(e.target.checked)}>
          Generate new key before inviting
        </Checkbox>
      </Box>
    </Box>
  );
};
