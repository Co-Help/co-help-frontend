import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {cancelBloodTestBooking} from '../../../redux/actions/user/bookingsAction';
import {BookingsCancelBtn} from './BookingsCancelBtn';

export const BloodTestBookingCancelBtn = ({id}) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const dispatch = useDispatch();

  return (
    <BookingsCancelBtn
      title='blood test'
      onClose={onClose}
      isOpen={isOpen}
      onOpen={() => setIsOpen(true)}
      onCancel={() => dispatch(cancelBloodTestBooking(id, onClose))}
    />
  );
};
