import {DeleteIcon} from '@chakra-ui/icons';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {EmptyMessage} from '../../../components/EmptyMessage';
import {Loader} from '../../../components/Loader';
import {addMember, deleteMember} from '../../../redux/actions/org/OrgAction';
import {errorToastOptions, toastOptions} from '../../../utils';

export const OrgMembersPanel = () => {
  const profile = useSelector(state => state.user.profile);
  const orgInfo = useSelector(state => state.orgInfo);
  const isOrg = profile && profile?.role === 'org';
  const isOrgMember = isOrg && profile.org.members.includes(profile.email);
  const isOrgAdmin = profile.email === profile.org.admin;
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const toast = useToast();
  const bg = useColorModeValue('gray.200', 'gray.700');

  const onAddMember = () => {
    if (email.trim()) {
      dispatch(
        addMember(
          email,
          () => toast({...toastOptions, title: 'Invitation sent'}),
          err =>
            toast({
              ...errorToastOptions,
              title: err.response.data.msg || 'Failed to send invitation',
            })
        )
      );
    }
  };

  if (orgInfo.error)
    return <EmptyMessage msg="Couldn't fetch organization information" />;

  return (
    <Box>
      {!isOrgMember && (
        <InputGroup size='md' mb='3'>
          <Input
            value={email}
            onChange={e => setEmail(e.target.value)}
            border='1px'
            borderColor='gray.400'
            p='6'
            type='email'
            shadow='sm'
            _focus={{shadow: 'lg'}}
            placeholder="Enter member's email"
          />
          <InputRightElement width='4.5rem' mr='1' mt='1'>
            <Button onClick={onAddMember} size='md' colorScheme='blue'>
              Invite
            </Button>
          </InputRightElement>
        </InputGroup>
      )}

      <Stack spacing='3'>
        {orgInfo.loading ? (
          <Loader />
        ) : (
          orgInfo?.members.map(({_id, avatar, name, email}) => (
            <HStack key={_id} bg={bg} px='3' py='2' rounded='md'>
              <Avatar name={name} src={avatar} />
              <Stack spacing='0'>
                <Heading fontSize='lg' letterSpacing='wide'>
                  {name}{' '}
                  {profile.org.admin === email && (
                    <Badge colorScheme='yellow'>ADMIN</Badge>
                  )}
                </Heading>
                <Text opacity='0.9'>{email}</Text>
              </Stack>
              <Spacer />
              {isOrgAdmin && email !== profile.org.admin && (
                <Popover>
                  <PopoverTrigger>
                    <IconButton
                      colorScheme='whiteAlpha'
                      size='sm'
                      aria-label='Remove this member'
                      title='Remove this member'
                      icon={<DeleteIcon color='red.500' />}
                    />
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Confirmation!</PopoverHeader>
                    <PopoverBody>
                      Are you sure you want to remove this member?
                    </PopoverBody>
                    <PopoverFooter d='flex' justifyContent='flex-end'>
                      <Button
                        onClick={() => dispatch(deleteMember(email))}
                        size='sm'
                        rounded='sm'
                        colorScheme='red'>
                        Yes, Remove
                      </Button>
                    </PopoverFooter>
                  </PopoverContent>
                </Popover>
              )}
            </HStack>
          ))
        )}
      </Stack>
    </Box>
  );
};
