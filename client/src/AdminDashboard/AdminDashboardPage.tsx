import React, { useLayoutEffect } from 'react';
import {
  Typography,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  Toolbar,
  Box,
} from '@mui/material';
import ScreenGrid from '../components/ScreenGrid';
import UserTable from './UserTable';
import InviteUserButton from '../components/buttons/InviteUserButton';
import CityDashboardPage from './CityDashboardPage';
import UserDashboardPage from './UserDashboardPage';

/**
 * This is the wrapper page that let's the admin swap between managing users and ciites
 */
function AdminDashboardPage() {
  const [manageState, setManageState] = React.useState('city');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string,
  ) => {
    setManageState(newValue);
  };

  useLayoutEffect(() => {
    document.body.style.backgroundColor = 'white';
  });
  return (
    <Grid
      container
      xs={12}
      flexDirection="column"
      padding={2}
      justifyContent="center"
      alignItems="center"
    >
      <Toolbar />
      <Box padding={2}>
        <ToggleButtonGroup
          color="primary"
          value={manageState}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="city">Manage Cities</ToggleButton>
          <ToggleButton value="user">Manage Users</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {manageState === 'city' && <CityDashboardPage />}

      {manageState === 'user' && <UserDashboardPage />}
    </Grid>
  );
}

export default AdminDashboardPage;
