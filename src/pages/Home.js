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
import {useSelector} from 'react-redux';
import {Link as RLink} from 'react-router-dom';

const DoctorCard = ({name, imageUrl, isPublic}) => {
  const bg = useColorModeValue('whiteAlpha.700', 'blackAlpha.500');

  return (
    <Box bg='gray.200' pos='relative'>
      <Image objectFit='cover' boxSize='300px' src={imageUrl} alt={name} />
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
        <Heading size='lg' textAlign='center'>
          {name}
        </Heading>
        <Link as={RLink} to={isPublic ? '/login' : '/doctors'}>
          View appointments &rarr;
        </Link>
      </Stack>
    </Box>
  );
};

export const Home = () => {
  const profile = useSelector(state => state.user.profile);
  const isPublic = !profile;

  const bg = useColorModeValue('blue.50', 'gray.700');
  const color = useColorModeValue('gray.600', 'gray.300');

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
            border='1px'
            borderColor='gray.400'
            p='6'
            type='text'
            shadow='sm'
            _focus={{shadow: 'lg'}}
            placeholder='Search with city, district or state'
          />
          <InputRightElement width='5.5rem' mr='1' mt='1'>
            <Button size='md' colorScheme='blue'>
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
          <DoctorCard
            isPublic={isPublic}
            name='Dr. Some Name'
            imageUrl='https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?size=338&ext=jpg'
          />
          <DoctorCard
            isPublic={isPublic}
            name='Dr. Some Name'
            imageUrl='https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?size=338&ext=jpg'
          />
          <DoctorCard
            isPublic={isPublic}
            name='Dr. Some Name'
            imageUrl='https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?size=338&ext=jpg'
          />
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
          <strong>Be an</strong> organizer
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
