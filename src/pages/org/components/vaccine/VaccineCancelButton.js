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
import {CANCEL_VACCINE_BOOKING} from '../../../../redux/actions/user/types';
import {AUTH_HEADER, toastOptions} from '../../../../utils';

export const VaccineCancelButton = ({id}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const cancelRef = useRef();
  const toast = useToast();
  const dispatch = useDispatch();

  const cancelBooking = async () => {
    try {
      await axios.delete('/services/vaccination', {data: {id}, ...AUTH_HEADER});
      dispatch({type: CANCEL_VACCINE_BOOKING, payload: id});
      toast({title: 'Vaccine booking cancelled.', ...toastOptions});
    } catch (err) {
      console.error(err);
      toast({title: 'Failed to cancel.', ...toastOptions, status: 'error'});
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
        Cancel
      </Button>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered>
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Cancel booking</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            You're about to cancel booking of vaccine, Continue?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme='red' ml={3} onClick={() => cancelBooking()}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
};
