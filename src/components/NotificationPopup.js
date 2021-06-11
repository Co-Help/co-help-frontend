import {IconButton} from '@chakra-ui/button';
import {BellIcon, CheckIcon, DeleteIcon} from '@chakra-ui/icons';
import {Box, Flex, Heading, Stack, Text} from '@chakra-ui/layout';
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/popover';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  getNotifications,
  markAsRead,
} from '../redux/actions/notifications/NotificationActions';

export const NotificationPopup = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.notifications.items);

  const unreadNotifications = notifications?.filter(n => !n.read);

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  return (
    <Popover isLazy placement='top-start'>
      <PopoverTrigger>
        <IconButton
          bg='transparent'
          size='sm'
          isRound
          variant='solid'
          aria-label='Show Notifications'
          icon={
            <BellIcon
              color={unreadNotifications?.length ? 'blue.500' : 'gray.500'}
              fontSize='xl'
            />
          }
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader fontWeight='semibold'>
          <Flex align='center' justify='space-between'>
            <Heading size='sm'>
              Notifications ({unreadNotifications?.length})
            </Heading>
            <IconButton
              bg='transparent'
              size='sm'
              isRound
              variant='solid'
              aria-label='Mark all as read'
              title='Mark all as read'
              icon={<DeleteIcon />}
            />
          </Flex>
        </PopoverHeader>
        <PopoverArrow />
        <PopoverBody>
          {unreadNotifications?.length ? (
            <Stack spacing={2}>
              {unreadNotifications.map(n => (
                <Flex
                  key={n._id}
                  bg='blackAlpha.100'
                  borderRadius={5}
                  p={2}
                  flexDirection='column'>
                  <Heading size='sm'>{n.title}</Heading>
                  <Text fontSize='sm'>{n.info}</Text>
                  <IconButton
                    onClick={() => dispatch(markAsRead(n._id))}
                    bg='transparent'
                    size='sm'
                    mt={2}
                    isRound
                    borderWidth='1px'
                    borderColor='gray.300'
                    variant='solid'
                    aria-label='Mark as read'
                    title='Mark as read'
                    icon={<CheckIcon />}
                  />
                </Flex>
              ))}
            </Stack>
          ) : (
            <Box my={10}>
              <Text textAlign='center' fontSize='sm' color='gray.500'>
                No new notifications
              </Text>
            </Box>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
