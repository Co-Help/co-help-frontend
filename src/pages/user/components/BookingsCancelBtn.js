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
} from '@chakra-ui/react';
import {useRef} from 'react';

export const BookingsCancelBtn = ({
  onCancel,
  title,
  onOpen,
  isOpen,
  onClose,
}) => {
  const cancelRef = useRef();

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
          <AlertDialogHeader>Confirmation</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            You're about to cancel booking of {title}, Continue?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme='red' ml={3} onClick={onCancel}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
};
