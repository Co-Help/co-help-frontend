import {Container, Heading, Stack, Text} from '@chakra-ui/layout';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ApplicationCard} from '../../components/ApplicationCard';
import {fetchOrgApplications} from '../../redux/actions/admin/adminActions';

export const Dashboard = () => {
  const dispatch = useDispatch();
  const applications = useSelector(state => state.orgApplications.applications);

  useEffect(() => {
    dispatch(fetchOrgApplications());
  }, [dispatch]);

  return (
    <Container mt={5} px={5} py={10}>
      <Heading size='md'>Organization Requests</Heading>

      {applications?.length ? (
        <Stack mt={5} spacing={3}>
          {applications?.map(application => (
            <ApplicationCard key={application._id} application={application} />
          ))}
        </Stack>
      ) : (
        <Text mt={55} fontSize='md' textAlign='center'>
          No requests available
        </Text>
      )}
    </Container>
  );
};
