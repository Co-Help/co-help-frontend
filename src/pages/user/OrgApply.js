import {Button} from '@chakra-ui/button';
import {Checkbox, CheckboxGroup} from '@chakra-ui/checkbox';
import {FormControl, FormLabel} from '@chakra-ui/form-control';
import {Input, InputGroup, InputLeftAddon} from '@chakra-ui/input';
import {Box, Container, Heading, Text, Wrap} from '@chakra-ui/layout';
import {NumberInput, NumberInputField} from '@chakra-ui/number-input';
import {Select} from '@chakra-ui/select';
import {Textarea} from '@chakra-ui/textarea';
import {useToast} from '@chakra-ui/toast';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {STATES} from '../../constants';
import {applyForOrg} from '../../redux/actions/user/userActions';

export const OrgApply = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const address = useSelector(state => state.user.profile?.address);
  const {orgApplySuccess, error} = useSelector(state => state.orgApply);

  const [services, setServices] = useState({
    vaccination: false,
    blood_test: false,
    blood_provide: false,
    oxygen_provide: false,
    bed_provide: false,
    doctor_appointment: false,
    emergency_provide: false,
  });
  const [form, setForm] = useState({
    name: '',
    info: '',
    helpline_no: '',
    city: address?.city ?? '',
    district: address?.district ?? '',
    pinCode: address?.pinCode ?? '',
    state: address?.state ?? '',
  });

  const onChange = e => setForm({...form, [e.target.name]: e.target.value});
  const onServiceChange = e =>
    setServices({...services, [e.target.value]: e.target.checked});
  const onSubmit = () => dispatch(applyForOrg({...form, ...services}));

  useEffect(() => {
    if (orgApplySuccess) {
      toast({
        title: 'Submitted successfully.',
        description:
          "We've received your application and will contact you soon.",
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      });
    }
  }, [orgApplySuccess, toast]);
  useEffect(() => {
    if (error) {
      toast({
        title: error,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      });
    }
  }, [error, toast]);

  return (
    <Container mt={5} p={5}>
      <Heading>Apply for Organization</Heading>
      <Text fontSize='lg'>
        Become an organizer to provide various service through our platform.
      </Text>
      <Box mt={5}>
        <FormControl id='name' mt={3}>
          <FormLabel>Organization name</FormLabel>
          <Input
            value={form.name}
            onChange={onChange}
            name='name'
            type='text'
            placeholder='Organization name'
          />
        </FormControl>
        <FormControl id='info' mt={3}>
          <FormLabel>Short info</FormLabel>
          <Textarea
            value={form.info}
            onChange={onChange}
            name='info'
            resize='none'
            placeholder='write something about your Organization'
          />
        </FormControl>
        <FormControl mt={3} id='helpline_no'>
          <FormLabel>Helpline Number</FormLabel>
          <InputGroup>
            <InputLeftAddon children='+91' />
            <Input
              value={form.helpline_no}
              onChange={onChange}
              name='helpline_no'
              type='tel'
              placeholder='Enter your phone number'
              min={10}
              max={10}
            />
          </InputGroup>
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
        <FormControl mt={3}>
          <FormLabel>Services</FormLabel>
          <CheckboxGroup colorScheme='blue' size='lg'>
            <Wrap spacing={3}>
              <Checkbox onChange={onServiceChange} value='vaccination'>
                Vaccination
              </Checkbox>
              <Checkbox onChange={onServiceChange} value='blood_test'>
                Blood test
              </Checkbox>
              <Checkbox onChange={onServiceChange} value='blood_provide'>
                Blood
              </Checkbox>
              <Checkbox onChange={onServiceChange} value='oxygen_provide'>
                Oxygen
              </Checkbox>
              <Checkbox onChange={onServiceChange} value='bed_provide'>
                Beds
              </Checkbox>
              <Checkbox onChange={onServiceChange} value='doctor_appointment'>
                Doctors
              </Checkbox>
              <Checkbox onChange={onServiceChange} value='emergency_provide'>
                Emergency Services
              </Checkbox>
            </Wrap>
          </CheckboxGroup>
        </FormControl>
        <Button
          mt={5}
          onClick={onSubmit}
          loadingText='wait...'
          colorScheme='blue'>
          Submit
        </Button>
      </Box>
    </Container>
  );
};
