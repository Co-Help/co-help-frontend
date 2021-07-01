import {CheckIcon, CloseIcon, DeleteIcon} from '@chakra-ui/icons';
import {
  Badge,
  IconButton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
} from '@chakra-ui/react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {Loader} from '../../../../components/Loader';
import {
  deleteBloodTestFromBatch,
  getBloodTestByBatch,
  setDoneBloodTest,
} from '../../../../redux/actions/org/bloodTestAction';
import {formatDate, getLocalTimeFromDate} from '../../../../utils';

export const BloodTestDetails = () => {
  const batches = useSelector(state => state.orgBloodTest.batches);
  const {batch_code} = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBloodTestByBatch(batch_code));
  }, [dispatch, batch_code]);

  if (!batches) return <Loader />;

  return (
    <div>
      <Text fontSize='md' mb='3'>
        Bookings for <strong>Blood test</strong> on{' '}
        <strong>{formatDate(batches?.[0]?.test_date)}</strong>
      </Text>
      <Table size='sm'>
        <Thead>
          <Tr>
            <Th>No.</Th>
            <Th>Name</Th>
            <Th isNumeric>Age</Th>
            <Th>Booking date</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {batches?.map((s, idx) => (
            <Tr key={s._id}>
              <Td>{idx + 1}</Td>
              <Td>{s?.patient_details?.name ?? 'N/A'}</Td>
              <Td isNumeric>{s?.patient_details?.age ?? 'N/A'}</Td>
              <Td>
                {s?.booking_date
                  ? formatDate(s?.booking_date) +
                    ' ' +
                    getLocalTimeFromDate(s?.booking_date)
                  : 'N/A'}
              </Td>
              <Td>
                <Badge colorScheme={s.booked ? 'green' : 'red'}>
                  {s.booked ? 'Booked' : 'Not booked'}
                </Badge>
              </Td>
              <Td>
                {s.booked && (
                  <Tooltip label='Set done/undone' hasArrow>
                    <IconButton
                      onClick={() =>
                        dispatch(
                          setDoneBloodTest({
                            id: s._id,
                            done: !s.done,
                            batch_code: s.batch_code,
                          })
                        )
                      }
                      size='sm'
                      icon={!s.done ? <CheckIcon /> : <CloseIcon />}
                    />
                  </Tooltip>
                )}
                {!s.booked && (
                  <Tooltip label='Delete blood test' hasArrow>
                    <IconButton
                      size='sm'
                      onClick={() => dispatch(deleteBloodTestFromBatch(s._id))}
                      aria-label='Delete blood test'
                      icon={<DeleteIcon color='red.600' />}
                    />
                  </Tooltip>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};
