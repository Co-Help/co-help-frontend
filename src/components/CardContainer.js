import {Flex, useColorModeValue} from '@chakra-ui/react';

export const CardContainer = ({children, ...props}) => {
  const bg = useColorModeValue('gray.100', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const hover = useColorModeValue({bg: 'gray.200'}, {bg: 'gray.600'});

  return (
    <Flex
      mb={2}
      transition='0.3s all ease-in-out'
      border='1px'
      _hover={hover}
      borderColor={borderColor}
      bg={bg}
      justify='space-between'
      align='center'
      rounded='sm'
      p={3}
      {...props}>
      {children}
    </Flex>
  );
};
