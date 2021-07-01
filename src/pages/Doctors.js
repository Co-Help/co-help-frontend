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

export const DoctorCard = ({s, url}) => (
  <CardContainer>
    <HStack>
      <Avatar mr={2} name={s.name} src={s.avatar}>
        <AvatarBadge
          boxSize='1em'
          bg={s.doctor_info.active ? 'green.500' : 'red.500'}
        />
      </Avatar>
      <Stack spacing={1}>
        <Heading size='sm'>Dr. {s.name}</Heading>
        <Text fontSize='sm'>
          Address:{' '}
          <strong>
            {s.doctor_info.org.name}, {s.doctor_info.org.address.city}
          </strong>
        </Text>
      </Stack>
    </HStack>
    <Link to={`${url}/${s._id}`}>
      <Button
        rightIcon={<ArrowForwardIcon />}
        isDisabled={!s.doctor_info.active}
        size='sm'
        rounded='sm'
        colorScheme='blue'>
        Details
      </Button>
    </Link>
  </CardContainer>
);

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
          {doctors?.map(s => (
            <DoctorCard url={url} key={s._id} s={s} />
          ))}
        </Route>
        <Route path={`${path}/:docId`} component={DoctorDetails} />
      </Switch>
    </Container>
  );
};
