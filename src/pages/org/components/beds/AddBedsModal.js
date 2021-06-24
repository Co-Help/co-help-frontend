import {AddIcon, EditIcon} from '@chakra-ui/icons';
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
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
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  addBedService,
  editBedService,
} from '../../../../redux/actions/org/bedAction';

export const AddBedsModal = ({editId, data}) => {
  const dispatch = useDispatch();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [form, setForm] = useState({
    cost: data?.cost ?? '',
    info: data?.info ?? '',
    total_beds: data?.total_beds ?? '',
    available_beds: data?.available_beds ?? '',
    available: data?.available ?? true,
  });

  const onChange = e =>
    setForm({...form, [e.target.name]: e.target.value || e.target.checked});

  const onSubmit = () =>
    !editId
      ? dispatch(addBedService(form, onClose))
      : dispatch(editBedService({id: data?._id, ...form}, onClose));

  return (
    <>
      {!editId ? (
        <Button
          onClick={onOpen}
          pos='absolute'
          bottom='0'
          right='0'
          rounded='full'
          colorScheme='blue'
          title='Add Beds'
          leftIcon={<AddIcon />}
          variant='solid'>
          Create
        </Button>
      ) : (
        <IconButton
          size='sm'
          onClick={onOpen}
          aria-label='Edit service'
          title='Edit service'
          icon={<EditIcon />}
        />
      )}
      <Modal
        size='lg'
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editId ? 'Edit' : 'Add'} Beds</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack>
              <FormControl id='total_beds'>
                <FormLabel>Total beds</FormLabel>
                <NumberInput defaultValue={form.total_beds} min={0}>
                  <NumberInputField
                    name='total_beds'
                    value={form.total_beds}
                    onChange={onChange}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl id='available_beds'>
                <FormLabel>Available beds</FormLabel>
                <NumberInput defaultValue={form.available_beds} min={0}>
                  <NumberInputField
                    name='available_beds'
                    value={form.available_beds}
                    onChange={onChange}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </HStack>
            <FormControl id='cost' mt={3}>
              <FormLabel>Cost</FormLabel>
              <NumberInput defaultValue={form.cost} min={0}>
                <NumberInputField
                  name='cost'
                  value={form.cost}
                  onChange={onChange}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
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
            <Checkbox
              mt={3}
              isChecked={form.available}
              onChange={onChange}
              name='available'>
              {form.available ? 'Mark as not available' : 'Mark as available'}
            </Checkbox>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onSubmit}>
              {editId ? 'Done' : 'Add'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
