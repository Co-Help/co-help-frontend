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
  Select,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {VACCINES} from '../../../../constants';
import {addVaccine} from '../../../../redux/actions/org/OrgAction';

export const AddVaccineModal = () => {
  const addVaccineSuccess = useSelector(
    state => state.orgVaccine.addVaccineSuccess
  );
  const dispatch = useDispatch();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [form, setForm] = useState({
    vaccine_name: '',
    vaccine_doze: '',
    vaccine_date: '',
    min_age: '',
    max_age: '',
    quantity: '',
    cost: '',
    info: '',
  });
  const onChange = e => setForm({...form, [e.target.name]: e.target.value});
  const onSubmit = () => dispatch(addVaccine(form));

  useEffect(() => {
    if (addVaccineSuccess) onClose();
  }, [addVaccineSuccess, onClose]);

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
          <ModalHeader>Add vaccines</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id='vaccine_name'>
              <FormLabel>Vaccine</FormLabel>
              <Select
                value={form.vaccine_name}
                onChange={onChange}
                name='vaccine_name'
                placeholder='Select vaccine'>
                {VACCINES.map(v => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl id='vaccine_doze' mt={3}>
              <FormLabel>Dose</FormLabel>
              <Select
                value={form.vaccine_doze}
                onChange={onChange}
                name='vaccine_doze'
                placeholder='Select dose'>
                <option value='1ST'>1ST</option>
                <option value='2ND'>2ND</option>
              </Select>
            </FormControl>
            <FormControl id='vaccine_date' mt={3}>
              <FormLabel>Vaccine Date</FormLabel>
              <InputGroup>
                <Input
                  value={form.vaccine_date}
                  onChange={onChange}
                  name='vaccine_date'
                  type='date'
                  min='1975-01-01'
                />
              </InputGroup>
            </FormControl>
            <HStack mt={3}>
              <FormControl id='min_age'>
                <FormLabel>Min age</FormLabel>
                <Input
                  value={form.min_age}
                  onChange={onChange}
                  name='min_age'
                  type='number'
                />
              </FormControl>
              <FormControl id='max_age'>
                <FormLabel>Max age</FormLabel>
                <Input
                  value={form.max_age}
                  onChange={onChange}
                  name='max_age'
                  type='number'
                />
              </FormControl>
            </HStack>
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
