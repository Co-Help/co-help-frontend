import {Button} from '@chakra-ui/button';
import {Badge, Flex, Heading, Text} from '@chakra-ui/layout';
import {useSelector} from 'react-redux';
import {Link, useLocation} from 'react-router-dom';
import {LogoutButton} from './LogoutButton';

const NavLink = ({to, title}) => {
  const {pathname} = useLocation();
  const isActiveLink = pathname === to;
  return (
    <Link to={to}>
      {isActiveLink ? (
        <Text color='blue.600' fontWeight='semibold'>
          {title}
        </Text>
      ) : (
        <Text>{title}</Text>
      )}
    </Link>
  );
};

export const Nav = () => {
  const profile = useSelector(state => state.user.profile);
  const isAdmin = profile && profile?.role === 'admin';
  const isOrg = profile && profile?.role === 'org';
  const isUser = profile && profile?.role === 'user';

  return (
    <Flex px={10} borderBottomWidth='1px' shadow='sm' align='center' h={50}>
      <Link to='/'>
        <Heading fontSize='xl' fontWeight='semibold'>
          Co.Help{' '}
          {(isOrg || isAdmin) && (
            <Badge mb={3} colorScheme='blue'>
              {profile?.role}
            </Badge>
          )}
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
            <NavLink to='/admin/dashboard' title='Dashboard' />
            <LogoutButton />
          </>
        )}

        {!isAdmin && (
          <>
            <NavLink to='/doctors' title='Doctors' />
            <NavLink to='/oxygen' title='Oxygen' />
            <NavLink to='/beds' title='Beds' />

            {(isUser || isOrg) && (
              <NavLink
                to={`/${isUser ? 'user' : 'org'}/profile`}
                title='Profile'
              />
            )}
            {!profile && <NavLink to='/login' title='Login' />}
            {!isOrg && (
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
            )}
          </>
        )}
      </Flex>
    </Flex>
  );
};
