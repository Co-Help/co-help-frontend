import {PhoneIcon} from '@chakra-ui/icons';
import {IconButton, Tooltip} from '@chakra-ui/react';

export const CallOrgBtn = ({helpline_no}) => (
  <Tooltip
    hasArrow
    placement='top'
    label={helpline_no}
    aria-label='Call organization'>
    <IconButton
      colorScheme='blue'
      size='sm'
      rounded='sm'
      aria-label='Call organization'
      title='Call organization'
      icon={<PhoneIcon />}
    />
  </Tooltip>
);
