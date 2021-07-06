import {useToast} from '@chakra-ui/react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {cancelAppointment} from '../../../redux/actions/user/bookingsAction';
import {errorToastOptions} from '../../../utils';
import {BookingsCancelBtn} from './BookingsCancelBtn';

export const AppointmentCancelBtn = ({id}) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const dispatch = useDispatch();
  const toast = useToast();

  return (
    <BookingsCancelBtn
      title='appointment'
      onClose={onClose}
      isOpen={isOpen}
      onOpen={() => setIsOpen(true)}
      onCancel={() =>
        dispatch(
          cancelAppointment(id, onClose, () =>
            toast({
              ...errorToastOptions,
              title: 'Failed to cancel booking',
            })
          )
        )
      }
    />
  );
};
