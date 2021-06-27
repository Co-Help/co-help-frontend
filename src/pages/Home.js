import {ExternalLinkIcon} from '@chakra-ui/icons';
import {Box} from '@chakra-ui/layout';
import {
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Link as RLink, useHistory} from 'react-router-dom';
import {Loader} from '../components/Loader';
import {getAddress, getUserPosition} from '../utils';

const DoctorCard = ({doc, isPublic}) => {
  const bg = useColorModeValue('whiteAlpha.700', 'blackAlpha.500');

  return (
    <Box bg='gray.200' pos='relative'>
      <Image
        objectFit='cover'
        boxSize='300px'
        src={doc?.avatar}
        fallbackSrc='https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?size=338&ext=jpg'
        alt={doc?.name}
      />
      <Stack
        backdropFilter='blur(10px)'
        bg={bg}
        spacing='0'
        w='full'
        align='center'
        justify='center'
        py='3'
        borderTopLeftRadius='2xl'
        borderTopRightRadius='2xl'
        bottom='0'
        pos='absolute'>
        <Heading size='md' textAlign='center'>
          Dr. {doc?.name}
        </Heading>
        <Link
          opacity='0.7'
          as={RLink}
          to={isPublic ? '/login' : `/doctors/${doc._id}`}>
          View appointments &rarr;
        </Link>
      </Stack>
    </Box>
  );
};

export const Home = () => {
  const profile = useSelector(state => state.user.profile);
  const isPublic = !profile;
  const [address, setAddress] = useState(profile?.address);
  const [doctors, setDoctors] = useState();
  const [err, setErr] = useState();
  const [search, setSearch] = useState('');
  const history = useHistory();

  const bg = useColorModeValue('blue.50', 'gray.700');
  const color = useColorModeValue('gray.600', 'gray.300');

  useEffect(() => {
    if (isPublic) {
      getUserPosition(coords => {
        getAddress(coords)
          .then(data => {
            setAddress(data);
          })
          .catch(setErr);
      }, setErr);
    }
  }, [isPublic, profile]);

  useEffect(() => {
    if (address) {
      axios
        .get(`/doctor?city=${address?.city || address?.town || ''}`)
        .then(({data}) => setDoctors(data.users));
    }
  }, [address]);

  useEffect(() => {
    if (address && !doctors) {
      axios
        .get(`/doctor?state=${address?.state}`)
        .then(({data}) => setDoctors(data.users));
    }
  }, [doctors, address]);

  return (
    <Box>
      <Flex
        bg={bg}
        flexDir='column'
        align='center'
        justify='center'
        rounded='md'
        py='20'>
        <Heading
          color={color}
          size='2xl'
          maxW='container.md'
          textAlign='center'>
          Quickly find and book medical services near you.
        </Heading>
        <InputGroup size='md' maxW='container.sm' mt='10'>
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            border='1px'
            borderColor='gray.400'
            p='6'
            type='text'
            shadow='sm'
            _focus={{shadow: 'lg'}}
            placeholder='Search with city, district or state'
          />
          <InputRightElement width='5.5rem' mr='1' mt='1'>
            <Button
              onClick={() => search && history.push(`/search/${search}`)}
              size='md'
              colorScheme='blue'>
              Search
            </Button>
          </InputRightElement>
        </InputGroup>
      </Flex>

      <Flex py='16' flexDir='column' align='center' justify='center'>
        <Text fontSize='4xl' fontWeight='thin'>
          <strong>Book an</strong> appointment
        </Text>
        <Text opacity='0.8'>
          Available doctors near you, book direct appointment, or search other
          places.
        </Text>
        <HStack spacing='8' mt='5'>
          {!err ? (
            <>
              {!doctors && (
                <Stack spacing='1'>
                  <Loader />
                  <Text>Fetching available doctors in your location</Text>
                </Stack>
              )}
              {doctors && !doctors?.length && (
                <Text>No doctors available in your city</Text>
              )}
              {doctors?.map(d => (
                <DoctorCard key={d._id} isPublic={isPublic} doc={d} />
              ))}
            </>
          ) : (
            <Text>{err || 'No doctors available in your location'}</Text>
          )}
        </HStack>
        <Link as={RLink} to={isPublic ? '/login' : '/doctors'}>
          <Text mt='5' fontSize='lg'>
            See all &rarr;
          </Text>
        </Link>
      </Flex>

      <Flex
        bg={bg}
        flexDir='column'
        align='center'
        justify='center'
        rounded='md'
        py='10'>
        <Text fontSize='4xl' fontWeight='thin'>
          <strong>Become an</strong> organizer
        </Text>
        <Text opacity='0.8'>
          Apply as organizer to provide various services through our platform.
        </Text>
        <Button colorScheme='blue' rounded='sm' mt='3.5'>
          {isPublic && (
            <Link as={RLink} to='/login'>
              Login to apply
            </Link>
          )}
          {profile?.role === 'user' && <Link href='/org/apply'>Apply now</Link>}
        </Button>
      </Flex>
      <Flex
        mt='5'
        px={10}
        borderTopWidth='1px'
        bg={bg}
        shadow='sm'
        align='center'
        h={50}>
        <Text fontWeight='bold'>Major Project 2021</Text>
        <Link ml='auto' isExternal href='https://github.com/Co-Help'>
          Source code on Github <ExternalLinkIcon mx='2px' />
        </Link>
      </Flex>
    </Box>
  );
};
