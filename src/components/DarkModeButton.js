import {MoonIcon, SunIcon} from '@chakra-ui/icons';
import {IconButton, Tooltip, useColorMode} from '@chakra-ui/react';

export const DarkModeButton = () => {
  const {colorMode, toggleColorMode} = useColorMode();
  return (
    <div>
      <IconButton
        bg='transparent'
        size='sm'
        isRound
        variant='solid'
        onClick={toggleColorMode}
        aria-label='Show Notifications'
        icon={
          <>
            <Tooltip
              hasArrow
              label={
                colorMode === 'light' ? 'Toggle Dark mode' : 'Toggle Light mode'
              }>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Tooltip>
          </>
        }
      />
    </div>
  );
};
