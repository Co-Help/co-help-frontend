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
  Center,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import {useRef} from 'react';
import {useGoogleLogout} from 'react-google-login';
import {useDispatch, useSelector} from 'react-redux';
import {LogoutButton} from '../../../components/LogoutButton';
import {deleteAccount, logout} from '../../../redux/actions/user/userActions';
import {errorToastOptions} from '../../../utils';

export const OthersTabPanel = () => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const cancelRef = useRef();
  const {signOut} = useGoogleLogout({
    clientId: process.env.REACT_APP_CLIENT_ID,
  });
  const dispatch = useDispatch();
  const toast = useToast();
  const id = useSelector(s => s.user.profile._id);

  const onDeleteAcc = async () => {
    dispatch(
      deleteAccount(
        id,
        () => {
          signOut();
          dispatch(logout());
          window.location.reload();
        },
        err =>
          toast({
            ...errorToastOptions,
            title: err.response.data.msg || 'Failed to delete account',
          })
      )
    );
  };

  return (
    <Center mt={5}>
      <ButtonGroup mt={2} size='sm'>
        <LogoutButton />

        <Button rounded='sm' onClick={onOpen} colorScheme='red'>
          Delete account
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
              Are you sure you want to delete your account permanently? Note
              that this action is irreversible!
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={onDeleteAcc} colorScheme='red' ml={3}>
                Yes, Delete!
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </ButtonGroup>
    </Center>
  );
};
