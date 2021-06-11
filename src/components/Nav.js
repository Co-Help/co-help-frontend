import {Button} from '@chakra-ui/button';
import {Flex, Heading, Text} from '@chakra-ui/layout';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {LogoutButton} from './LogoutButton';

export const Nav = () => {
  const profile = useSelector(state => state.user.profile);
  const isAdmin = profile && profile?.role === 'admin';
  const isOrg = profile && profile?.role === 'org';
  const isUser = profile && profile?.role === 'user';

  return (
    <Flex px={10} borderBottomWidth='1px' shadow='sm' align='center' h={50}>
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
        {isAdmin && (
          <>
            <Link to='/admin/dashboard'>
              <Text>Dashboard</Text>
            </Link>
            <LogoutButton />
          </>
        )}

        {!isAdmin && (
          <>
            <Link to='/doctors'>
              <Text>Doctors</Text>
            </Link>
            <Link to='/oxygen'>
              <Text>Oxygen</Text>
            </Link>
            <Link to='/beds'>
              <Text>Beds</Text>
            </Link>

            {(isUser || isOrg) && (
              <>
                <Link to={`/${isUser ? 'user' : 'org'}/profile`}>
                  <Text>Profile</Text>
                </Link>
              </>
            )}
            {!profile && (
              <>
                <Link to='/login'>
                  <Text>Login</Text>
                </Link>
              </>
            )}
            <Link to='/emergency'>
              <Button
                size='sm'
                colorScheme='blue'
                rounded='sm'
                color='white'
                fontWeight='semibold'>
                EMERGENCY
              </Button>
            </Link>
          </>
        )}
      </Flex>
    </Flex>
  );
};
