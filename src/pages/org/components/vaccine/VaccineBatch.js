import {Box, HStack, Radio, RadioGroup, Text, useToast} from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {Loader} from '../../../../components/Loader';
import {
  deleteVaccineFromBatch,
  FilterValues,
  getVaccineBatch,
  vaccineBatchFilter,
} from '../../../../redux/actions/org/OrgAction';
import {errorToastOptions} from '../../../../utils';
import {VaccineBatchCard} from './VaccineBatchCard';

export const VaccineBatch = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const {batch_code} = useParams();
  const [filter, setFilter] = useState(FilterValues.all);
  const {vaccineBatch, vaccineBatchError, filteredBatch} = useSelector(
    state => state.orgVaccine
  );

  const onFilterChange = e => {
    setFilter(e.target.value);
    if (FilterValues.all !== e.target.value)
      dispatch(vaccineBatchFilter(e.target.value));
  };

  const onDelete = id =>
    dispatch(
      deleteVaccineFromBatch(id, () =>
        toast({...errorToastOptions, title: 'Failed to delete vaccine'})
      )
    );

  useEffect(() => {
    dispatch(getVaccineBatch(batch_code));
  }, [dispatch, batch_code]);

  if (vaccineBatchError) return <Text>Something went wrong</Text>;
  if (!vaccineBatch) return <Loader />;

  return (
    <Box my={5}>
      <RadioGroup defaultValue={FilterValues.all} my={3}>
        <HStack spacing={4}>
          <Text>Filter: </Text>
          <Radio onChange={onFilterChange} isChecked value={FilterValues.all}>
            All
          </Radio>
          <Radio onChange={onFilterChange} value={FilterValues.booked}>
            Booked
          </Radio>
          <Radio onChange={onFilterChange} value={FilterValues.nonBooked}>
            Not Booked
          </Radio>
        </HStack>
      </RadioGroup>

      {filter === FilterValues.all
        ? vaccineBatch?.map(v => (
            <VaccineBatchCard onDelete={onDelete} key={v._id} vaccine={v} />
          ))
        : filteredBatch?.map(v => (
            <VaccineBatchCard onDelete={onDelete} key={v._id} vaccine={v} />
          ))}
    </Box>
  );
};
