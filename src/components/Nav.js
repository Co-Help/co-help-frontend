import {Button} from '@chakra-ui/button';
import {Flex, Heading, Text} from '@chakra-ui/layout';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

export const Nav = () => {
  const profile = useSelector(state => state.user.profile);

  return (
    <Flex align='center' h={50}>
      <Link to='/'>
        <Heading fontSize='xl' fontWeight='semibold'>
          Co.Help
        </Heading>
      </Link>
      <Flex
        align='center'
        ml='auto'
        sx={{
          'a:not(:last-child)': {
            paddingRight: '1rem',
          },
        }}>
        <Link to='/doctors'>
          <Text>Doctors</Text>
        </Link>
        <Link to='/oxygen'>
          <Text>Oxygen</Text>
        </Link>
        <Link to='/beds'>
          <Text>Beds</Text>
        </Link>
        {profile ? (
          <Link to='/user/profile'>
            <Text>Profile</Text>
          </Link>
        ) : (
          <Link to='/login'>
            <Text>Login</Text>
          </Link>
        )}
        <Link to='/emergency'>
          <Button
            colorScheme='blue'
            rounded='sm'
            color='white'
            fontWeight='semibold'>
            EMERGENCY
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};
