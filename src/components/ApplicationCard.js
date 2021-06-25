import {Button, ButtonGroup} from '@chakra-ui/button';
import {Checkbox, CheckboxGroup} from '@chakra-ui/checkbox';
import {useDisclosure} from '@chakra-ui/hooks';
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CloseIcon,
} from '@chakra-ui/icons';
import {Badge, Box, Divider, Heading, Text, Wrap} from '@chakra-ui/layout';
import {Collapse} from '@chakra-ui/transition';
import {useDispatch} from 'react-redux';
import {approveApplication} from '../redux/actions/admin/adminActions';
import {CardContainer} from './CardContainer';

export const ApplicationCard = ({application}) => {
  const dispatch = useDispatch();
  const {
    name,
    user,
    status,
    info,
    helpline_no,
    services,
    address: {city, district, pinCode, state},
  } = application;

  const {isOpen, onToggle} = useDisclosure();

  return (
    <Box>
      <CardContainer>
        <Box>
          <Heading size='md'>
            {name} <Badge colorScheme='blue'>{status}</Badge>
          </Heading>

          <Text fontSize='sm'>by {user.name}</Text>
        </Box>
        <Button
          onClick={onToggle}
          size='sm'
          colorScheme='blue'
          rightIcon={!isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}>
          View details
        </Button>
      </CardContainer>
      <Collapse in={isOpen} animateOpacity>
        <Box p={5} mt='2' borderWidth='1px' rounded='md' shadow='md'>
          <Heading size='sm'>Info</Heading>
          <Divider my={2} />
          <Text fontSize='sm'>{info}</Text>

          <Heading size='sm' mt={2}>
            Other Details
          </Heading>
          <Divider my={2} />
          <Text fontSize='sm'>
            Address: {`${city}, ${district}, ${state}, ${pinCode}`}
          </Text>
          <Text fontSize='sm'>Helpline no: {helpline_no}</Text>

          <Heading size='sm' mt={2}>
            Services
          </Heading>
          <Divider my={2} />
          <CheckboxGroup colorScheme='blue' size='sm'>
            <Wrap spacing={3}>
              <Checkbox isChecked={services.vaccination}>Vaccination</Checkbox>
              <Checkbox isChecked={services.blood_test}>Blood test</Checkbox>
              <Checkbox isChecked={services.blood_provide}>Blood</Checkbox>
              <Checkbox isChecked={services.oxygen_provide}>Oxygen</Checkbox>
              <Checkbox isChecked={services.bed_provide}>Beds</Checkbox>
              <Checkbox isChecked={services.doctor_appointment}>
                Doctors
              </Checkbox>
              <Checkbox isChecked={services.emergency_provide}>
                Emergency Services
              </Checkbox>
            </Wrap>
          </CheckboxGroup>
          <Divider my={2} />
          <ButtonGroup>
            <Button
              onClick={() =>
                dispatch(approveApplication(application._id, user._id))
              }
              disabled={status === 'approved'}
              size='sm'
              rounded='sm'
              leftIcon={<CheckIcon />}
              colorScheme='blue'>
              Approve
            </Button>
            <Button
              size='sm'
              rounded='sm'
              leftIcon={<CloseIcon />}
              colorScheme='red'>
              Reject
            </Button>
          </ButtonGroup>
        </Box>
      </Collapse>
    </Box>
  );
};
