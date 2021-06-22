import {Table, TableCaption, Tbody, Th, Thead, Tr} from '@chakra-ui/react';

export const AppointmentTable = ({children, title}) => {
  return (
    <Table size='sm' variant='simple'>
      <TableCaption placement='top' fontSize='lg' mb={2}>
        {title}
      </TableCaption>
      <Thead>
        <Tr>
          <Th>No.</Th>
          <Th>Date</Th>
          <Th isNumeric>Cost</Th>
          <Th>Info</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>{children}</Tbody>
    </Table>
  );
};
