import {AddIcon, EditIcon} from '@chakra-ui/icons';
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
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
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  addBloodTest,
  editBloodTest,
} from '../../../../redux/actions/org/bloodTestAction';

const today = new Date().toISOString().split('T')[0];

export const AddBloodTestModal = ({editId, data}) => {
  const dispatch = useDispatch();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [form, setForm] = useState({
    cost: data?.cost ?? '',
    info: data?.info ?? '',
    quantity: data?.quantity ?? '',
    test_date: data?.test_date.split('T')[0] ?? today,
  });

  const onChange = e =>
    setForm({...form, [e.target.name]: e.target.value || e.target.checked});

  const onSubmit = () =>
    !editId
      ? dispatch(addBloodTest(form, onClose))
      : dispatch(
          editBloodTest({batch_code: data?.batch_code, ...form}, onClose)
        );

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
          title='Add Blood Test'
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
          <ModalHeader>{editId ? 'Edit' : 'Add'} Blood test</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack>
              <FormControl id='cost'>
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
              {!editId && (
                <FormControl id='quantity'>
                  <FormLabel>Quantity</FormLabel>
                  <NumberInput defaultValue={form.quantity} min={0}>
                    <NumberInputField
                      name='quantity'
                      value={form.quantity}
                      onChange={onChange}
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
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
            <FormControl id='test_date' mt={3}>
              <FormLabel>Test Date</FormLabel>
              <Input
                min={today}
                value={form.test_date}
                onChange={onChange}
                name='test_date'
                type='date'
              />
            </FormControl>
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
