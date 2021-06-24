import {DeleteIcon} from '@chakra-ui/icons';
import {
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
  deleteBloodTest,
  getBloodTestServices,
} from '../../redux/actions/org/bloodTestAction';
import {AddBloodTestModal} from './components/bloodTest/AddBloodTestModal';

export const BloodTest = () => {
  const bloodTestServices = useSelector(state => state.orgBloodTest.services);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBloodTestServices());
  }, [dispatch]);

  if (!bloodTestServices) return <Loader />;

  return (
    <Box pos='relative' minH='85vh'>
      <Table size='sm'>
        <Thead>
          <Tr>
            <Th>No.</Th>
            <Th isNumeric>Cost</Th>
            <Th>Info</Th>
            <Th>Test Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {bloodTestServices?.map((s, idx) => (
            <Tr key={s._id}>
              <Td>{idx + 1}</Td>
              <Td isNumeric>{s.cost}</Td>
              <Td>{s.info}</Td>
              <Td>{s.test_date.split('T')[0]}</Td>
              <Td>
                <AddBloodTestModal editId={s._id} data={s} />
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
                        onClick={() => dispatch(deleteBloodTest(s.batch_code))}
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
      <AddBloodTestModal />
    </Box>
  );
};
