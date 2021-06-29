import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import {useRef} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {getAllVaccines} from '../../../../redux/actions/user/vaccineActions';
import {AUTH_HEADER, toastOptions} from '../../../../utils';

export const VaccineBookButton = ({batch_code}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const history = useHistory();
  const cancelRef = useRef();
  const toast = useToast();
  const dispatch = useDispatch();

  const bookVaccine = async () => {
    try {
      await axios.post('/services/vaccination', {batch_code}, AUTH_HEADER);
      toast({title: 'Vaccine booked successfully.', ...toastOptions});
      dispatch(getAllVaccines());
      history.push('/user/profile');
    } catch (err) {
      console.error(err);
      toast({title: 'Failed to book.', ...toastOptions, status: 'error'});
    } finally {
      onClose();
    }
  };

  return (
    <Box pl={2}>
      <Button
        rounded='sm'
        size='sm'
        colorScheme='blue'
        variant='outline'
        onClick={onOpen}>
        Book
      </Button>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered>
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Book vaccine</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            You're about to book vaccine, Continue?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme='red' ml={3} onClick={() => bookVaccine()}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
};
