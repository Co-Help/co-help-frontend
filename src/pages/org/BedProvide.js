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
  deleteBedService,
  getBedsServices,
} from '../../redux/actions/org/bedAction';
import {AddBedsModal} from './components/beds/AddBedsModal';

export const BedProvide = () => {
  const bedServices = useSelector(state => state.beds.services);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBedsServices());
  }, [dispatch]);

  if (!bedServices) return <Loader />;

  return (
    <Box pos='relative' minH='85vh'>
      <Table size='sm'>
        <Thead>
          <Tr>
            <Th>No.</Th>
            <Th isNumeric>Cost</Th>
            <Th>Info</Th>
            <Th>Available</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {bedServices?.map((s, idx) => (
            <Tr key={s._id}>
              <Td>{idx + 1}</Td>
              <Td isNumeric>{s.cost}</Td>
              <Td>{s.info}</Td>
              <Td>
                {s.available_beds}/{s.total_beds}
              </Td>
              <Td>
                {s.available ? (
                  <Badge colorScheme='green'>Available</Badge>
                ) : (
                  <Badge colorScheme='red'>Not Available</Badge>
                )}
              </Td>
              <Td>
                <AddBedsModal editId={s._id} data={s} />
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
                        onClick={() => dispatch(deleteBedService(s._id))}
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
      <AddBedsModal />
    </Box>
  );
};
