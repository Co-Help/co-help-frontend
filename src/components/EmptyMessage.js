import {Text} from '@chakra-ui/react';

export const EmptyMessage = ({msg}) => (
  <Text textAlign='center'>{msg || 'Nothing here'}</Text>
);
