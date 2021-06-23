import {DeleteIcon} from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Button,
  Center,
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
  deleteBloodService,
  getBloodServices,
} from '../../redux/actions/org/bloodActions';
import {AddBloodModal} from './components/blood/AddBloodModal';

export const BloodProvide = () => {
  const dispatch = useDispatch();
  const orgBloodServices = useSelector(state => state.orgBlood.services);

  useEffect(() => {
    dispatch(getBloodServices());
  }, [dispatch]);

  if (!orgBloodServices) return <Loader />;

  return (
    <Box pos='relative' minH='85vh'>
      <Table size='sm'>
        <Thead>
          <Tr>
            <Th>No.</Th>
            <Th>Group</Th>
            <Th>Info</Th>
            <Th>Cost</Th>
            <Th>Status</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {orgBloodServices?.map((s, idx) => (
            <Tr key={s._id}>
              <Td>{idx + 1}</Td>
              <Td>{s.group}</Td>
              <Td>{s.info}</Td>
              <Td>{s.cost}</Td>
              <Td>
                {s.available ? (
                  <Badge colorScheme='green'>Available</Badge>
                ) : (
                  <Badge colorScheme='red'>Not Available</Badge>
                )}
              </Td>
              <Td>
                <Center>
                  <AddBloodModal editModal data={s} />
                  <Popover>
                    <PopoverTrigger>
                      <IconButton
                        size='sm'
                        ml={2}
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
                          onClick={() => dispatch(deleteBloodService(s._id))}
                          size='sm'
                          rounded='sm'
                          colorScheme='red'>
                          Yes, Delete
                        </Button>
                      </PopoverFooter>
                    </PopoverContent>
                  </Popover>
                </Center>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <AddBloodModal />
    </Box>
  );
};
