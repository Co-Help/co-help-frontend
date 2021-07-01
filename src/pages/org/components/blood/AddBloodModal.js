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
  Select,
  Textarea,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {BLOOD_GROUPS} from '../../../../constants';
import {
  addBloodService,
  editBloodService,
} from '../../../../redux/actions/org/bloodActions';

export const AddBloodModal = ({editModal, data}) => {
  const {addBloodSuccess, editBloodSuccess} = useSelector(
    state => state.orgBlood
  );
  const dispatch = useDispatch();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [form, setForm] = useState({
    cost: data?.cost ?? '',
    group: data?.group ?? '',
    info: data?.info ?? '',
    available: data?.available ?? false,
  });

  const onChange = e =>
    setForm({...form, [e.target.name]: e.target.value || e.target.checked});

  const onSubmit = () =>
    !editModal
      ? dispatch(addBloodService(form))
      : dispatch(editBloodService({id: data?._id, ...form}));

  useEffect(() => {
    onClose();
  }, [addBloodSuccess, editBloodSuccess, onClose]);

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
          <IconButton size='sm' onClick={onOpen} icon={<EditIcon />} />
        </Tooltip>
      )}
      <Modal
        size='lg'
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editModal ? 'Edit' : 'Add'} Blood</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id='group'>
              <FormLabel>Blood group</FormLabel>
              <Select
                value={form.group}
                onChange={onChange}
                name='group'
                placeholder='Select blood group'>
                {BLOOD_GROUPS.map(grp => (
                  <option key={grp} value={grp}>
                    {grp}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl id='cost' mt={3}>
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
            {editModal && (
              <Checkbox
                mt={3}
                isChecked={form.available}
                onChange={onChange}
                name='available'>
                {form.available ? 'Mark as not available' : 'Mark as available'}
              </Checkbox>
            )}
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
