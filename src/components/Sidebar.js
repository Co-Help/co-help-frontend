import {Box, Link, Stack, Text, useColorModeValue} from '@chakra-ui/react';
import {Link as ReactLink, useLocation} from 'react-router-dom';

export const Sidebar = ({sideBarLinks, url}) => {
  const location = useLocation();
  const bgActive = useColorModeValue('blue.300', 'blue.600');
  const bgInActive = useColorModeValue('gray.100', 'gray.700');

  return (
    <Box flex={1} mr={5}>
      <Stack>
        {sideBarLinks.map(({title, to}) => (
          <Link
            key={to}
            p={2}
            bg={location.pathname.includes(to) ? bgActive : bgInActive}
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
