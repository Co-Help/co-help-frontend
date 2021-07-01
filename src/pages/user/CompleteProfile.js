import {Button} from '@chakra-ui/button';
import {FormControl, FormLabel} from '@chakra-ui/form-control';
import {Input, InputGroup, InputLeftAddon} from '@chakra-ui/input';
import {Box, Container, Heading, Text} from '@chakra-ui/layout';
import {NumberInput, NumberInputField} from '@chakra-ui/number-input';
import {useToast} from '@chakra-ui/react';
import {Select} from '@chakra-ui/select';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router';
import {STATES} from '../../constants';
import {completeProfile} from '../../redux/actions/user/userActions';
import {errorToastOptions, TODAY} from '../../utils';

export const CompleteProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const toast = useToast();
  const userProfile = useSelector(state => state.user.profile);
  const [form, setForm] = useState({
    mobile_no: '',
    aadhar: '',
    dob: '',
    city: '',
    district: '',
    pinCode: '',
    state: '',
  });

  const onChange = e => setForm({...form, [e.target.name]: e.target.value});
  const onSubmit = () =>
    dispatch(
      completeProfile(
        form,
        () => {
          window.location.reload();
        },
        err =>
          toast({
            ...errorToastOptions,
            title: err.response.data.msg || 'Failed to submit',
          })
      )
    );

  useEffect(() => {
    if (userProfile.is_profile_completed) history.push('/');
  }, [userProfile, history]);

  return (
    <Container mt={5} p={5}>
      <Heading>Hello, {userProfile?.name.split(' ')[0]}</Heading>
      <Text fontSize='xl'>
        Please complete your profile to find services near you.
      </Text>
      <Box mt={5}>
        <FormControl id='mobile_no'>
          <FormLabel>Phone Number</FormLabel>
          <InputGroup>
            <InputLeftAddon children='+91' />
            <NumberInput width='full' min={'0000000000'} max={'9999999999'}>
              <NumberInputField
                value={form.mobile_no}
                onChange={onChange}
                name='mobile_no'
                type='tel'
                placeholder='Enter your phone number'
              />
            </NumberInput>
          </InputGroup>
        </FormControl>
        <FormControl id='dob' mt={3}>
          <FormLabel>Date of birth</FormLabel>
          <InputGroup>
            <Input
              name='dob'
              value={form.dob}
              onChange={onChange}
              type='date'
              min='1975-01-01'
              max={TODAY}
            />
          </InputGroup>
        </FormControl>
        <FormControl id='aadhar' mt={3}>
          <FormLabel>Aadhaar no</FormLabel>
          <NumberInput width='full'>
            <NumberInputField
              value={form.aadhar}
              onChange={onChange}
              name='aadhar'
              type='number'
              placeholder='Aadhaar no'
            />
          </NumberInput>
        </FormControl>
        <FormControl id='city' mt={3}>
          <FormLabel>City</FormLabel>
          <Input
            value={form.city}
            onChange={onChange}
            name='city'
            type='text'
            placeholder='Your city'
          />
        </FormControl>
        <FormControl id='district' mt={3}>
          <FormLabel>District</FormLabel>
          <Input
            value={form.district}
            onChange={onChange}
            name='district'
            type='text'
            placeholder='Your district'
          />
        </FormControl>
        <FormControl id='pinCode' mt={3}>
          <FormLabel>Pincode</FormLabel>
          <NumberInput>
            <NumberInputField
              value={form.pinCode}
              onChange={onChange}
              name='pinCode'
              placeholder='Enter your pin code'
            />
          </NumberInput>
        </FormControl>
        <FormControl id='state' mt={3}>
          <FormLabel>State</FormLabel>
          <Select
            value={form.state}
            onChange={onChange}
            name='state'
            placeholder='Select state'>
            {STATES.map(s => (
              <option key={s.code} value={s.state}>
                {s.state}
              </option>
            ))}
          </Select>
        </FormControl>
        <Button
          mt={3}
          onClick={onSubmit}
          loadingText='wait...'
          colorScheme='blue'>
          Complete
        </Button>
      </Box>
    </Container>
  );
};
