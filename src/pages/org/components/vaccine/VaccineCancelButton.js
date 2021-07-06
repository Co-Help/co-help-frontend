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
import {useRef} from 'react';
import {useDispatch} from 'react-redux';
import {cancelVaccinationBooking} from '../../../../redux/actions/user/bookingsAction';
import {errorToastOptions} from '../../../../utils';

export const VaccineCancelButton = ({id}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const cancelRef = useRef();
  const dispatch = useDispatch();
  const toast = useToast();

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
            <Button
              colorScheme='red'
              ml={3}
              onClick={() =>
                dispatch(
                  cancelVaccinationBooking(id, onClose, () =>
                    toast({
                      ...errorToastOptions,
                      title: 'Failed to cancel booking',
                    })
                  )
                )
              }>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
};
