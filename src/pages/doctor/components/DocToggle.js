import {Box, Switch, Tooltip} from '@chakra-ui/react';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {AUTH_HEADER} from '../../../utils';

export const DocStatusToggle = () => {
  const active = useSelector(state => state.user.profile.doctor_info.active);
  const [statusChecked, setStatusChecked] = useState(active);

  const statusLabel = `Turn ${statusChecked ? 'off' : 'on'} active status`;

  useEffect(() => {
    setStatusChecked(active);
  }, [active]);

  const onStatusChange = async e => {
    const checked = e.target.checked;
    try {
      await axios.post(
        `/doctor/${!checked ? 'disable' : 'enable'}`,
        {},
        AUTH_HEADER
      );
      setStatusChecked(checked);
    } catch (err) {
      setStatusChecked(statusChecked);
    }
  };

  return (
    <Tooltip hasArrow label={statusLabel} aria-label={statusLabel}>
      <Box mt={1} mr={2}>
        <Switch
          isChecked={statusChecked}
          onChange={onStatusChange}
          id='docStatus'
        />
      </Box>
    </Tooltip>
  );
};
