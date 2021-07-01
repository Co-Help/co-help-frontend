import {Tooltip} from '@chakra-ui/react';

export const FloatingLabel = ({label, children, ...props}) => {
  return (
    <Tooltip label={label} placement='top' hasArrow {...props}>
      {children}
    </Tooltip>
  );
};
