import {Button} from '@chakra-ui/button';
import {Box, Flex, Heading, Text} from '@chakra-ui/layout';
import {ImGoogle} from 'react-icons/im';

export const Login = () => {
  return (
    <Flex bg='#DBE2EF' minH='100vh' minW='full'>
      <Flex
        justify='center'
        align='center'
        w='full'
        bg='#FCFDFF'
        boxShadow='lg'
        p={5}>
        <Button
          bg='#3F72AF'
          _hover={{background: '#3F72AF'}}
          p={6}
          color='white'
          leftIcon={<ImGoogle color='white' size='20' />}>
          Login with Google
        </Button>
      </Flex>

      <Box display={['none', 'block']} p={5} py={10} w='full'>
        <Heading>Co-Help</Heading>
        <Text fontSize='xl'>
          Find doctors, beds, oxygen and other medical needs.
        </Text>
      </Box>
    </Flex>
  );
};
