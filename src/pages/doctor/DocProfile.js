import {Avatar} from '@chakra-ui/avatar';
import {Center, Container, Heading, Text} from '@chakra-ui/layout';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ButtonGroup,
  useDisclosure,
} from '@chakra-ui/react';
import axios from 'axios';
import {useRef} from 'react';
import {useSelector} from 'react-redux';
import {LogoutButton} from '../../components/LogoutButton';
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

export const DocProfile = () => {
  const logout = useLogout();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const cancelRef = useRef();
  const {name, email, avatar} = useSelector(state => state.user.profile);

  return (
    <Container mt={5} px={5} py={10}>
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
