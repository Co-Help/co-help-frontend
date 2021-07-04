import {Box, Text} from '@chakra-ui/react';
import {CallOrgBtn} from '../../../components/CallOrgBtn';
import {CardContainer} from '../../../components/CardContainer';
import {formatDate, getLocalTimeFromDate} from '../../../utils';
import {AppointmentCancelBtn} from './AppointmentCancelBtn';

export const AppointmentCard = ({data, isDone}) => {
  return (
    <CardContainer>
      <Box mr='auto'>
        <Text>{data.info}</Text>
        <Text>
          Date: {formatDate(data.appointment_date)} &bull; Time:{' '}
          {getLocalTimeFromDate(data.appointment_date)}
        </Text>
        <Text>
          Address: {data.org.name}, {data.org.address.city}
        </Text>
      </Box>
      <CallOrgBtn helpline_no={data.org.helpline_no} />
      {!isDone && <AppointmentCancelBtn id={data._id} />}
    </CardContainer>
  );
};
