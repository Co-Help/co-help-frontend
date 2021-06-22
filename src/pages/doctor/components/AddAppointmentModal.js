import {AddIcon} from '@chakra-ui/icons';
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addAppointment} from '../../../redux/actions/doctor/docActions';

export const AddAppointmentModal = () => {
  const addAppointmentSuccess = useSelector(
    state => state.docAppointment.addAppointmentSuccess
  );
  const dispatch = useDispatch();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [form, setForm] = useState({
    appointment_date: '',
    quantity: '',
    cost: '',
    info: '',
  });

  const onChange = e => setForm({...form, [e.target.name]: e.target.value});
  const onSubmit = () => dispatch(addAppointment(form));

  useEffect(() => {
    if (addAppointmentSuccess) onClose();
  }, [addAppointmentSuccess, onClose]);

  return (
    <>
      <Button
        onClick={onOpen}
        pos='absolute'
        bottom='0'
        right='0'
        rounded='full'
        colorScheme='blue'
        leftIcon={<AddIcon />}
        variant='solid'>
        Add vaccines
      </Button>
      <Modal
        size='lg'
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add appointment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id='appointment_date' mt={3}>
              <FormLabel>Appointment Date</FormLabel>
              <InputGroup>
                <Input
                  value={form.appointment_date}
                  onChange={onChange}
                  name='appointment_date'
                  type='date'
                  min='1975-01-01'
                />
              </InputGroup>
            </FormControl>
            <HStack mt={3}>
              <FormControl id='cost'>
                <FormLabel>Cost</FormLabel>
                <Input
                  value={form.cost}
                  onChange={onChange}
                  name='cost'
                  type='number'
                />
              </FormControl>
              <FormControl id='quantity'>
                <FormLabel>Quantity</FormLabel>
                <Input
                  value={form.quantity}
                  onChange={onChange}
                  name='quantity'
                  type='number'
                />
              </FormControl>
            </HStack>
            <FormControl id='info' mt={3}>
              <FormLabel>Info</FormLabel>
              <Textarea
                value={form.info}
                onChange={onChange}
                name='info'
                resize='none'
                placeholder='Short info'
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onSubmit}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
