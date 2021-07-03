import {ChevronRightIcon, DeleteIcon} from '@chakra-ui/icons';
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
  Tooltip,
  Tr,
} from '@chakra-ui/react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useRouteMatch} from 'react-router-dom';
import {Loader} from '../../components/Loader';
import {
  deleteOxygenService,
  getOxygenServices,
} from '../../redux/actions/org/oxygenActions';
import {AddOxygenModal} from './components/oxygen/AddOxygenModal';

export const Oxygen = () => {
  const o2Services = useSelector(state => state.orgO2.services);
  const dispatch = useDispatch();
  let {url} = useRouteMatch();

  useEffect(() => {
    dispatch(getOxygenServices());
  }, [dispatch]);

  if (!o2Services) return <Loader />;

  return (
    <Box pos='relative' minH='85vh'>
      <Table size='sm'>
        <Thead>
          <Tr>
            <Th>No.</Th>
            <Th isNumeric>Capacity</Th>
            <Th isNumeric>Cost</Th>
            <Th>Info</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {o2Services?.map((s, idx) => (
            <Tr key={s._id}>
              <Td>{idx + 1}</Td>
              <Td isNumeric>{s.capacity}</Td>
              <Td isNumeric>{s.cost}</Td>
              <Td>{s.info}</Td>
              <Td>
                <AddOxygenModal editId={s._id} data={s} />
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
                        onClick={() =>
                          dispatch(deleteOxygenService(s.batch_code))
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
                    <IconButton ml='1' size='sm' icon={<ChevronRightIcon />} />
                  </Tooltip>
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <AddOxygenModal />
    </Box>
  );
};
