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
} from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {bookAppointment} from '../../../redux/actions/user/doctorActions';

export const BookAppointmentModal = ({a}) => {
  const dispatch = useDispatch();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {bookedId} = useSelector(state => state.doctors);

  const [bookForOthers, setBookForOthers] = useState(false);
  const [form, setForm] = useState({
    mobile_no: '',
    age: '',
    name: '',
  });
  const onChange = e =>
    setForm({...form, [e.target.name]: e.target.value || e.target.checked});

  useEffect(() => {
    onClose();
  }, [onClose, bookedId]);

  return (
    <>
      <Button
        onClick={onOpen}
        isDisabled={a.booked}
        size='sm'
        rounded='sm'
        colorScheme='blue'>
        Book now
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Booking appointment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>You're about to book for an appointment, continue?</Text>
            <Checkbox
              isChecked={bookForOthers}
              onChange={e => setBookForOthers(e.target.checked)}
              mt={2}>
              Book for someone else?
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
                  bookAppointment({
                    bookingId: a._id,
                    batch_code: a.batch_code,
                    form,
                    self_booking: !bookForOthers,
                  })
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
