import {ExternalLinkIcon} from '@chakra-ui/icons';
import {Box, Link, Text} from '@chakra-ui/layout';
import {Button} from '@chakra-ui/react';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {Link as ReactLink} from 'react-router-dom';
import {LogoutButton} from '../../../components/LogoutButton';
import {AUTH_HEADER} from '../../../utils';

const getApplicationStatus = async () => {
  try {
    const {data} = await axios.get('/application', AUTH_HEADER);
    return data?.application;
  } catch (err) {
    console.error(err);
  }
};

export const OthersTabPanel = () => {
  const [applicationStatus, setApplicationStatus] = useState();

  useEffect(() => {
    getApplicationStatus().then(application =>
      setApplicationStatus(application?.status)
    );
  }, []);

  const deleteApplication = async () => {
    try {
      await axios.delete('/application', AUTH_HEADER);
      setApplicationStatus(undefined);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      {applicationStatus ? (
        <>
          <Text>
            Your application is still under process, please wait for
            confirmation email.
          </Text>
          {applicationStatus === 'pending' && (
            <Button
              onClick={deleteApplication}
              mt={2}
              size='sm'
              colorScheme='red'
              rounded='sm'>
              Delete Application
            </Button>
          )}
        </>
      ) : (
        <Link as={ReactLink} to='/org/apply'>
          Become an Organizer, apply now <ExternalLinkIcon mx='2px' />
        </Link>
      )}
      <Box mt={5}>
        <LogoutButton />
      </Box>
    </>
  );
};
