import {
  Box,
  Button,
  Checkbox,
  Collapse,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {bookBloodTest} from '../../../redux/actions/user/bloodTestActions';
import {toastOptions} from '../../../utils';

export const BookBloodTestModal = ({data}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const toast = useToast();
  const {isOpen, onOpen, onClose} = useDisclosure();

  const [bookForOthers, setBookForOthers] = useState(false);
  const [form, setForm] = useState({
    mobile_no: '',
    age: '',
    name: '',
  });

  const onChange = e => setForm({...form, [e.target.name]: e.target.value});

  return (
    <>
      <Button
        onClick={onOpen}
        isDisabled={data.booked}
        size='sm'
        variant='outline'
        rounded='sm'
        colorScheme='blue'>
        Book now
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Booking Blood test</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>You're about to book for blood test, continue?</Text>
            <Checkbox
              isChecked={bookForOthers}
              onChange={e => setBookForOthers(e.target.checked)}
              mt={2}>
              Book for someone else
            </Checkbox>

            <Collapse in={bookForOthers} animateOpacity>
              <Box mt={2} p={2}>
                <FormControl isRequired id='name'>
                  <FormLabel>Name</FormLabel>
                  <Input
                    onChange={onChange}
                    value={form.name}
                    type='text'
                    name='name'
                    placeholder='Name of the person'
                  />
                </FormControl>
                <FormControl isRequired mt={2} id='age'>
                  <FormLabel>Age</FormLabel>
                  <NumberInput max={100} min={1}>
                    <NumberInputField
                      onChange={onChange}
                      value={form.age}
                      name='age'
                      placeholder='Age of the person'
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <FormControl isRequired mt={2} id='mobile_no'>
                  <FormLabel>Mobile no</FormLabel>
                  <NumberInput>
                    <NumberInputField
                      onChange={onChange}
                      value={form.mobile_no}
                      name='mobile_no'
                      placeholder='Mobile no of the person'
                    />
                  </NumberInput>
                </FormControl>
              </Box>
            </Collapse>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme='blue'
              rounded='sm'
              size='sm'
              onClick={() => {
                dispatch(
                  bookBloodTest(
                    {
                      batch_code: data.batch_code,
                      form,
                      self_booking: !bookForOthers,
                    },
                    () => {
                      onClose();
                      toast({...toastOptions, title: 'Booking successful'});
                      history.push('/user/profile');
                    }
                  )
                );
              }}
              variant='solid'>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
