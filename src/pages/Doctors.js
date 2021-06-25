import {ArrowForwardIcon} from '@chakra-ui/icons';
import {
  Avatar,
  AvatarBadge,
  Button,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, Route, Switch, useRouteMatch} from 'react-router-dom';
import {CardContainer} from '../components/CardContainer';
import {Loader} from '../components/Loader';
import {fetchDoctors} from '../redux/actions/user/doctorActions';
import {DoctorDetails} from './user/components/DoctorDetails';

export const Doctors = () => {
  const dispatch = useDispatch();
  const doctors = useSelector(state => state.doctors.items);
  let {path, url} = useRouteMatch();

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  if (!doctors) return <Loader />;

  return (
    <Container pos='relative' minH='85vh'>
      <Switch>
        <Route exact path={path}>
          {!doctors?.length && (
            <Text textAlign='center' mt={50}>
              Doctors are unavailable!
            </Text>
          )}
          {doctors?.map(({_id: id, name, avatar, doctor_info}) => (
            <CardContainer key={id}>
              <HStack>
                <Avatar mr={2} name={name} src={avatar}>
                  <AvatarBadge
                    boxSize='1em'
                    bg={doctor_info.active ? 'green.500' : 'red.500'}
                  />
                </Avatar>
                <Stack spacing={1}>
                  <Heading size='sm'>Dr. {name}</Heading>
                  <Text fontSize='sm'>
                    on <strong>{doctor_info.org.name}</strong>
                  </Text>
                </Stack>
              </HStack>
              <Link to={`${url}/${id}`}>
                <Button
                  rightIcon={<ArrowForwardIcon />}
                  isDisabled={!doctor_info.active}
                  size='sm'
                  rounded='sm'
                  colorScheme='blue'>
                  Details
                </Button>
              </Link>
            </CardContainer>
          ))}
        </Route>
        <Route path={`${path}/:docId`} component={DoctorDetails} />
      </Switch>
    </Container>
  );
};
