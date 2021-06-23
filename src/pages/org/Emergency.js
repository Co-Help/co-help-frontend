import {DeleteIcon} from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Button,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Loader} from '../../components/Loader';
import {
  deleteEmergencyService,
  getEmergencyServices,
} from '../../redux/actions/org/emergencyActions';
import {AddEmergencyModal} from './components/emergency/AddEmergencyModal';

export const Emergency = () => {
  const {addEmergencySuccess, editEmergencySuccess} = useSelector(
    state => state.orgEmergency
  );
  const emergencyServices = useSelector(state => state.orgEmergency.services);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmergencyServices());
  }, [dispatch, addEmergencySuccess, editEmergencySuccess]);

  if (!emergencyServices) return <Loader />;

  return (
    <Box pos='relative' minH='85vh'>
      <Table size='sm'>
        <Thead>
          <Tr>
            <Th>No.</Th>
            <Th isNumeric>Cost</Th>
            <Th isNumeric>Helpline</Th>
            <Th>Info</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {emergencyServices?.map((s, idx) => (
            <Tr key={s._id}>
              <Td>{idx + 1}</Td>
              <Td isNumeric>{s.cost}</Td>
              <Td isNumeric>{s.emergency_no}</Td>
              <Td>{s.info}</Td>
              <Td>
                {s.available ? (
                  <Badge colorScheme='green'>Available</Badge>
                ) : (
                  <Badge colorScheme='red'>Not Available</Badge>
                )}
              </Td>
              <Td>
                <AddEmergencyModal editId={s._id} data={s} />
                <Popover>
                  <PopoverTrigger>
                    <IconButton
                      ml={2}
                      size='sm'
                      aria-label='Delete this Service'
                      title='Delete this Service'
                      icon={<DeleteIcon color='red.500' />}
                    />
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Confirmation!</PopoverHeader>
                    <PopoverBody>
                      Are you sure you want to delete this service?
                    </PopoverBody>
                    <PopoverFooter d='flex' justifyContent='flex-end'>
                      <Button
                        onClick={() => dispatch(deleteEmergencyService(s._id))}
                        size='sm'
                        rounded='sm'
                        colorScheme='red'>
                        Delete
                      </Button>
                    </PopoverFooter>
                  </PopoverContent>
                </Popover>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <AddEmergencyModal />
    </Box>
  );
};
