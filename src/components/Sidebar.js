import {Box, Link, Stack, Text} from '@chakra-ui/react';
import {Link as ReactLink, useLocation} from 'react-router-dom';

export const Sidebar = ({sideBarLinks, url}) => {
  const location = useLocation();
  return (
    <Box flex={1} mr={5}>
      <Stack>
        {sideBarLinks.map(({title, to}) => (
          <Link
            key={to}
            p={2}
            bg={location.pathname.includes(title) ? 'blue.200' : 'gray.100'}
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
