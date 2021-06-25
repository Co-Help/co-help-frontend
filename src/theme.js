import {extendTheme} from '@chakra-ui/react';

const theme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: true,
  fonts: {
    heading: 'Poppins',
    body: 'Poppins',
  },
});

export default theme;
