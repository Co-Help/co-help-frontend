import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {cancelAppointment} from '../../../redux/actions/user/bookingsAction';
import {BookingsCancelBtn} from './BookingsCancelBtn';

export const AppointmentCancelBtn = ({id}) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const dispatch = useDispatch();

  return (
    <BookingsCancelBtn
      title='appointment'
      onClose={onClose}
      isOpen={isOpen}
      onOpen={() => setIsOpen(true)}
      onCancel={() => dispatch(cancelAppointment(id, onClose))}
    />
  );
};
