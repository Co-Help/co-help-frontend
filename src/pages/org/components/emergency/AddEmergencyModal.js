import {AddIcon, EditIcon} from '@chakra-ui/icons';
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  addEmergencyService,
  editEmergencyService,
} from '../../../../redux/actions/org/emergencyActions';

export const AddEmergencyModal = ({editId, data}) => {
  const {addEmergencySuccess, editEmergencySuccess} = useSelector(
    state => state.orgEmergency
  );
  const dispatch = useDispatch();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [form, setForm] = useState({
    cost: data?.cost ?? '',
    info: data?.info ?? '',
    available: data?.available ?? true,
    emergency_no: data?.emergency_no ?? '',
  });

  const onChange = e =>
    setForm({...form, [e.target.name]: e.target.value || e.target.checked});

  const onSubmit = () =>
    !editId
      ? dispatch(addEmergencyService(form))
      : dispatch(editEmergencyService({id: data?._id, ...form}));

  useEffect(() => {
    if (addEmergencySuccess) onClose();
  }, [addEmergencySuccess, editEmergencySuccess, onClose]);

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
          title='Add new emergency service'
          leftIcon={<AddIcon />}
          variant='solid'>
          Add
        </Button>
      ) : (
        <Tooltip label='Edit details' hasArrow>
          <IconButton
            size='sm'
            onClick={onOpen}
            aria-label='Edit service'
            title='Edit service'
            icon={<EditIcon />}
          />
        </Tooltip>
      )}
      <Modal
        size='lg'
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editId ? 'Edit' : 'Add'} emergency service</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id='emergency_no'>
              <FormLabel>Emergency no</FormLabel>
              <Input
                value={form.emergency_no}
                onChange={onChange}
                name='emergency_no'
                type='number'
              />
            </FormControl>
            <FormControl mt={3} id='cost'>
              <FormLabel>Cost</FormLabel>
              <Input
                value={form.cost}
                onChange={onChange}
                name='cost'
                type='number'
              />
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
