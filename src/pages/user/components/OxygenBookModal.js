import {
  Button,
  FormControl,
  FormLabel,
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
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {
  bookOxygenService,
  getOxygenServices,
} from '../../../redux/actions/user/oxygenActions';
import {errorToastOptions, toastOptions} from '../../../utils';

export const OxygenBookButton = ({batch_code}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const history = useHistory();
  const toast = useToast();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState('');

  const onBook = () => {
    dispatch(
      bookOxygenService(
        {batch_code, quantity},
        () => {
          toast({title: 'Oxygen booked successfully.', ...toastOptions});
          dispatch(getOxygenServices());
          history.push('/user/profile');
        },
        err =>
          toast({
            ...errorToastOptions,
            title: err.response.data.msg || 'Failed to book.',
          })
      )
    );
  };

  return (
    <>
      <Button
        rounded='sm'
        size='sm'
        colorScheme='blue'
        variant='outline'
        onClick={onOpen}>
        Book
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>You're about to book oxygen, Continue?</Text>
            <FormControl isRequired mt={2} id='quantity'>
              <FormLabel>Quantity</FormLabel>
              <NumberInput max={100} min={1}>
                <NumberInputField
                  onChange={e => setQuantity(e.target.value)}
                  value={quantity}
                  name='quantity'
                  placeholder='Quantity'
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme='blue'
              rounded='sm'
              size='sm'
              onClick={onBook}
              variant='solid'>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
