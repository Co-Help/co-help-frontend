import {CheckIcon, CloseIcon, DeleteIcon} from '@chakra-ui/icons';
import {Badge, Box, Heading, HStack, IconButton, Text} from '@chakra-ui/react';
import {useDispatch} from 'react-redux';
import {CardContainer} from '../../../../components/CardContainer';
import {setDoneVaccine} from '../../../../redux/actions/org/OrgAction';

export const VaccineBatchCard = ({
  onDelete,
  vaccine: {
    _id,
    info,
    done,
    vaccine_date,
    vaccine_doze,
    vaccine_name,
    age_restriction,
    cost,
    booked,
  },
}) => {
  const dispatch = useDispatch();

  return (
    <CardContainer key={_id}>
      <Box>
        <Heading size='md'>
          {vaccine_name} <Badge colorScheme='yellow'>{vaccine_doze} Dose</Badge>{' '}
          <Badge colorScheme={booked ? 'green' : 'red'}>
            {booked ? 'Booked' : 'Not booked'}
          </Badge>
        </Heading>
        <HStack>
          <Text fontSize='sm'>Price: Rs. {cost}</Text>
          <Text fontSize='sm'>
            Age: {age_restriction.min_age} - {age_restriction.max_age}
          </Text>
          <Text fontSize='sm'>Date: {vaccine_date.split('T')[0]}</Text>
        </HStack>
        <Text>{info}</Text>
      </Box>
      <Box>
        {booked && (
          <IconButton
            onClick={() => dispatch(setDoneVaccine({id: _id, done: !done}))}
            size='sm'
            aria-label='Set done/undone'
            title='Set done/undone'
            icon={!done ? <CheckIcon /> : <CloseIcon />}
          />
        )}
        {!booked && (
          <IconButton
            onClick={() => onDelete(_id)}
            aria-label='Delete Vaccine'
            icon={<DeleteIcon color='red.600' />}
          />
        )}
      </Box>
    </CardContainer>
  );
};
