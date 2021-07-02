import {Button} from '@chakra-ui/button';
import {Checkbox, CheckboxGroup} from '@chakra-ui/checkbox';
import {FormControl, FormLabel} from '@chakra-ui/form-control';
import {DownloadIcon} from '@chakra-ui/icons';
import {Input, InputGroup, InputLeftAddon} from '@chakra-ui/input';
import {Box, Container, Text, Wrap} from '@chakra-ui/layout';
import {NumberInput, NumberInputField} from '@chakra-ui/number-input';
import {Center, Flex, Image, useColorModeValue} from '@chakra-ui/react';
import {Select} from '@chakra-ui/select';
import {Textarea} from '@chakra-ui/textarea';
import {useToast} from '@chakra-ui/toast';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {useGoogleLogin} from 'react-google-login';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {useFileUpload} from 'use-file-upload';
import {STATES} from '../../constants';
import {applyForOrg} from '../../redux/actions/user/userActions';
import {errorToastOptions, toastOptions} from '../../utils';

const checkOrgApplyEligibility = async (email, cb, errCb) => {
  try {
    await axios.get('/application/can_apply', {params: {email}});
    cb?.();
  } catch (err) {
    errCb?.(err);
  }
};

export const OrgApply = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const {orgApplySuccess, error} = useSelector(state => state.orgApply);
  const [canApply, setCanApply] = useState(false);
  const history = useHistory();

  const defaultSrc =
    'https://afridi-angell.com/wp-content/uploads/2020/09/no_avatar.jpg';

  const [file, selectFiles] = useFileUpload();

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
    logo_url: '',
    helpline_no: '',
    email: '',
    city: '',
    district: '',
    pinCode: '',
    state: '',
  });

  const onChange = e => setForm({...form, [e.target.name]: e.target.value});
  const onServiceChange = e =>
    setServices({...services, [e.target.value]: e.target.checked});

  useEffect(() => {
    if (orgApplySuccess) {
      toast({
        ...toastOptions,
        title: 'Submitted successfully.',
        description:
          "We've received your application and will contact you soon.",
      });
      history.push('/');
    }
  }, [orgApplySuccess, history, toast]);

  useEffect(() => {
    if (error) {
      toast({...errorToastOptions, title: error});
    }
  }, [error, toast]);

  const onUpload = ({file}) => {
    const formData = new FormData();
    formData.append('image', file);
    const options = {
      method: 'POST',
      url: 'https://api.imgbb.com/1/upload',
      params: {key: process.env.REACT_APP_IMGBB_KEY},
      data: formData,
    };

    axios
      .request(options)
      .then(({data}) => setForm(form => ({...form, logo_url: data.data.url})))
      .catch(() =>
        toast({...errorToastOptions, title: 'Failed to upload logo'})
      );
  };

  const bg = useColorModeValue('gray.100', 'gray.700');

  const onSuccess = async res => {
    // TODO: check if the form.email is same as this one
    dispatch(applyForOrg({...form, ...services, idToken: res.tokenId}));
  };

  const onFailure = () =>
    toast({
      ...errorToastOptions,
      title: 'Authorization failed, please try again',
    });

  const {signIn, loaded} = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId: process.env.REACT_APP_CLIENT_ID,
  });

  return (
    <Container maxW='container.sm' mt={5} p={5}>
      <Flex
        bg={bg}
        flexDir='column'
        align='center'
        justify='center'
        rounded='md'
        py='5'
        px='2'>
        <Text fontSize='4xl' fontWeight='thin'>
          <strong>Become an</strong> organizer
        </Text>
        <Text opacity='0.8'>
          Apply as organizer to provide various services through our platform.
        </Text>
        <Center mt='3' flexDir='column'>
          <FormControl id='email' mt={3}>
            <Input
              value={form.email}
              onChange={onChange}
              name='email'
              type='text'
              placeholder='Enter organization email'
            />
          </FormControl>
          <Button
            isDisabled={canApply}
            onClick={() =>
              form.email &&
              checkOrgApplyEligibility(
                form.email,
                () => {
                  toast({
                    ...toastOptions,
                    title: 'Success',
                    description:
                      "You're eligible to become an organizer, please complete the form.",
                  });
                  setCanApply(true);
                },
                err => {
                  setCanApply(false);
                  toast({
                    ...errorToastOptions,
                    title: err.response.data.msg || 'Something went wrong',
                  });
                }
              )
            }
            colorScheme='blue'
            rounded='sm'
            mt='3.5'>
            Check Eligibility
          </Button>
        </Center>
      </Flex>
      {canApply && (
        <Box mt={5}>
          <Center flexDir='column'>
            <Image
              src={file?.source || defaultSrc}
              alt='preview'
              borderRadius='full'
              boxSize='120px'
            />
            <Button
              mt='2'
              rounded='sm'
              size='sm'
              rightIcon={<DownloadIcon transform='rotate(180deg)' />}
              onClick={() => selectFiles({accept: 'image/*'}, onUpload)}>
              Upload Logo
            </Button>
          </Center>
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
          <Center mt='8'>
            <Button
              isLoading={!loaded}
              onClick={signIn}
              loadingText='Loading...'
              colorScheme='blue'>
              Authorize &amp; Submit
            </Button>
          </Center>
        </Box>
      )}
    </Container>
  );
};
