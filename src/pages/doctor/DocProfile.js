import {Avatar} from '@chakra-ui/avatar';
import {Center, Container, Heading, Text} from '@chakra-ui/layout';
import {
  Alert,
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertIcon,
  Button,
  ButtonGroup,
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
  useDisclosure,
} from '@chakra-ui/react';
import axios from 'axios';
import {useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {LogoutButton} from '../../components/LogoutButton';
import {updateDoctorInfo} from '../../redux/actions/doctor/docActions';
import {AUTH_HEADER} from '../../utils';
import {useLogout} from '../../utils/useLogout';

const leaveDoctorRole = async logout => {
  try {
    await axios.post('/doctor/leave', {}, AUTH_HEADER);
    logout?.();
  } catch (err) {
    console.error(err);
  }
};

const UpdateModal = ({children, isOpen, onClose}) => {
  const [form, setForm] = useState({specialties: '', qualifications: ''});
  const onChange = e => setForm({...form, [e.target.name]: e.target.value});
  const dispatch = useDispatch();

  return (
    <>
      {children}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id='specialties'>
              <FormLabel>Specialties</FormLabel>
              <Input
                onChange={onChange}
                value={form.specialties}
                name='specialties'
                type='text'
                placeholder='e.g. specialty 1, specialty 2'
              />
            </FormControl>
            <FormControl mt='2' id='qualifications'>
              <FormLabel>Qualifications</FormLabel>
              <Input
                onChange={onChange}
                value={form.qualifications}
                name='qualifications'
                type='text'
                placeholder='e.g. qualifications 1, qualifications 2'
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme='blue'
              onClick={() => dispatch(updateDoctorInfo(form))}>
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export const DocProfile = () => {
  const logout = useLogout();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {
    isOpen: isUpdateModalOpen,
    onOpen: onUpdateModalOpen,
    onClose: onUpdateModalClose,
  } = useDisclosure();
  const cancelRef = useRef();
  const {name, email, avatar, doctor_info} = useSelector(
    state => state.user.profile
  );

  return (
    <Container mt={5} px={5} py={10}>
      {!doctor_info.specialties?.length ? (
        <Alert rounded='md' status='warning'>
          <AlertIcon />
          <Text>Please update your specialties, qualifications</Text>
          <UpdateModal isOpen={isUpdateModalOpen} onClose={onUpdateModalClose}>
            <Button
              onClick={onUpdateModalOpen}
              ml='auto'
              colorScheme='orange'
              size='sm'>
              Update
            </Button>
          </UpdateModal>
        </Alert>
      ) : null}
      <Center py={5} flexDirection='column'>
        <Avatar src={avatar} name={name ?? 'User'} size='2xl' />
        <Heading pt={2}>Dr. {name}</Heading>
        <Text>{email}</Text>
        <ButtonGroup mt={2} size='sm'>
          <LogoutButton />

          <Button rounded='sm' onClick={onOpen} colorScheme='red'>
            Leave doctor role
          </Button>
          <AlertDialog
            motionPreset='slideInBottom'
            leastDestructiveRef={cancelRef}
            isOpen={isOpen}
            onClose={onClose}
            isCentered>
            <AlertDialogOverlay />

            <AlertDialogContent>
              <AlertDialogHeader>Confirmation</AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody>
                You're about to leave doctor role, Continue?
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  No
                </Button>
                <Button
                  colorScheme='red'
                  ml={3}
                  onClick={() => leaveDoctorRole(logout)}>
                  Yes
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </ButtonGroup>
      </Center>
    </Container>
  );
};
