import {AddIcon, EditIcon} from '@chakra-ui/icons';
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
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
  Tooltip,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {VACCINES} from '../../../../constants';
import {
  addVaccine,
  editVaccine,
  getVaccines,
} from '../../../../redux/actions/org/OrgAction';
import {
  errorToastOptions,
  getInputTimeFromDate,
  TODAY,
} from '../../../../utils';

export const AddVaccineModal = ({editModal, data}) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const {isOpen, onOpen, onClose} = useDisclosure();

  const [form, setForm] = useState({
    vaccine_name: data?.vaccine_name ?? '',
    vaccine_doze: data?.vaccine_doze ?? '',
    vaccine_date: data?.vaccine_date.split('T')[0] ?? TODAY,
    vaccine_time: getInputTimeFromDate(data?.vaccine_date) ?? '10:00',
    min_age: data?.age_restriction.min_age ?? '',
    max_age: data?.age_restriction.max_age ?? '',
    quantity: '',
    cost: data?.cost ?? '',
    info: data?.info ?? '',
  });

  const onChange = e => setForm({...form, [e.target.name]: e.target.value});
  const onSubmit = () =>
    !editModal
      ? dispatch(
          addVaccine(
            form,
            () => {
              onClose();
              dispatch(getVaccines());
            },
            () => toast({...errorToastOptions, title: 'Failed to add vaccine'})
          )
        )
      : dispatch(
          editVaccine(
            {batch_code: data?.batch_code, ...form},
            () => {
              onClose();
              dispatch(getVaccines());
            },
            () => toast({...errorToastOptions, title: 'Failed to edit vaccine'})
          )
        );

  return (
    <>
      {!editModal ? (
        <Button
          onClick={onOpen}
          pos='absolute'
          bottom='0'
          right='0'
          rounded='full'
          colorScheme='blue'
          leftIcon={<AddIcon />}
          variant='solid'>
          Add
        </Button>
      ) : (
        <Tooltip label='Edit details' hasArrow>
          <IconButton onClick={onOpen} icon={<EditIcon />} />
        </Tooltip>
      )}

      <Modal
        size='lg'
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editModal ? 'Edit' : 'Add'} vaccines</ModalHeader>
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
            <HStack mt='3'>
              <FormControl id='vaccine_date'>
                <FormLabel>Vaccine Date</FormLabel>
                <InputGroup>
                  <Input
                    value={form.vaccine_date}
                    onChange={onChange}
                    name='vaccine_date'
                    type='date'
                    min={TODAY}
                  />
                </InputGroup>
              </FormControl>
              <FormControl id='vaccine_time'>
                <FormLabel>Vaccine time</FormLabel>
                <Input
                  value={form.vaccine_time}
                  onChange={onChange}
                  name='vaccine_time'
                  type='time'
                />
              </FormControl>
            </HStack>

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
              {!editModal && (
                <FormControl id='quantity'>
                  <FormLabel>Quantity</FormLabel>
                  <Input
                    value={form.quantity}
                    onChange={onChange}
                    name='quantity'
                    type='number'
                  />
                </FormControl>
              )}
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
              {editModal ? 'Done' : 'Add'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
