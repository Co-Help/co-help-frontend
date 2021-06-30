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
import {
  bookVaccine,
  getAllVaccines,
} from '../../../../redux/actions/user/vaccineActions';
import {toastOptions} from '../../../../utils';

export const VaccineBookButton = ({batch_code}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const history = useHistory();
  const toast = useToast();
  const dispatch = useDispatch();

  const [bookForOthers, setBookForOthers] = useState(false);
  const [form, setForm] = useState({
    mobile_no: '',
    age: '',
    name: '',
  });

  const onChange = e => setForm({...form, [e.target.name]: e.target.value});

  const onBook = () => {
    dispatch(
      bookVaccine(
        {
          batch_code,
          form,
          self_booking: !bookForOthers,
        },
        () => {
          toast({title: 'Vaccine booked successfully.', ...toastOptions});
          dispatch(getAllVaccines());
          history.push('/user/profile');
        },
        () =>
          toast({title: 'Failed to book.', ...toastOptions, status: 'error'})
      )
    );
  };

  return (
    <>
      <Button
        rounded='sm'
        size='sm'
        colorScheme='blue'
        variant='outline'
        onClick={onOpen}>
        Book
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>You're about to book vaccine, Continue?</Text>
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
              onClick={onBook}
              variant='solid'>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
