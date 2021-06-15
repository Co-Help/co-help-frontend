import {Box, Link, Stack, Text} from '@chakra-ui/react';
import {Link as ReactLink} from 'react-router-dom';

export const Sidebar = ({sideBarLinks, url}) => {
  return (
    <Box flex={1} mr={5}>
      <Stack>
        {sideBarLinks.map(({title, to}) => (
          <Link
            key={to}
            p={2}
            bg='gray.100'
            rounded='sm'
            as={ReactLink}
            to={url + to}>
            <Text textTransform='capitalize'>{title}</Text>
          </Link>
        ))}
      </Stack>
    </Box>
  );
};
