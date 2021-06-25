import {CheckIcon, CloseIcon} from '@chakra-ui/icons';
import {IconButton, Table, Tbody, Td, Th, Thead, Tr} from '@chakra-ui/react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {Loader} from '../../../../components/Loader';
import {
  getBloodTestByBatch,
  setDoneBloodTest,
} from '../../../../redux/actions/org/bloodTestAction';

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
      <Table size='sm'>
        <Thead>
          <Tr>
            <Th>No.</Th>
            <Th isNumeric>Cost</Th>
            <Th>Info</Th>
            <Th>Test Date</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {batches?.map((s, idx) => (
            <Tr key={s._id}>
              <Td>{idx + 1}</Td>
              <Td isNumeric>{s.cost}</Td>
              <Td>{s.info}</Td>
              <Td>{s.test_date.split('T')[0]}</Td>
              <Td>
                {s.booked && (
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
                    aria-label='Set done/undone'
                    title='Set done/undone'
                    icon={!s.done ? <CheckIcon /> : <CloseIcon />}
                  />
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};
