import {ChevronRightIcon, DeleteIcon} from '@chakra-ui/icons';
import {
  Box,
  Button,
  HStack,
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
  Tooltip,
  Tr,
} from '@chakra-ui/react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useRouteMatch} from 'react-router-dom';
import {Loader} from '../../components/Loader';
import {
  deleteBloodTest,
  getBloodTestServices,
} from '../../redux/actions/org/bloodTestAction';
import {AddBloodTestModal} from './components/bloodTest/AddBloodTestModal';

export const BloodTest = () => {
  const bloodTestServices = useSelector(state => state.orgBloodTest.services);
  const dispatch = useDispatch();
  let {url} = useRouteMatch();

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
            <Th>actions</Th>
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
                <HStack spacing={1}>
                  <AddBloodTestModal editId={s._id} data={s} />
                  {/* FIXME: if booked is true, hide delete btn */}
                  <Popover>
                    <PopoverTrigger>
                      <IconButton
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
                          onClick={() =>
                            dispatch(deleteBloodTest(s.batch_code))
                          }
                          size='sm'
                          rounded='sm'
                          colorScheme='red'>
                          Delete
                        </Button>
                      </PopoverFooter>
                    </PopoverContent>
                  </Popover>
                  <Link to={`${url}/${s.batch_code}`}>
                    <Tooltip label='See all bookings' hasArrow>
                      <IconButton size='sm' icon={<ChevronRightIcon />} />
                    </Tooltip>
                  </Link>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <AddBloodTestModal />
    </Box>
  );
};
