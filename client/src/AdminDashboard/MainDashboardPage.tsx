import React, { useLayoutEffect } from 'react';
import { Typography, Grid } from '@mui/material';
import ScreenGrid from '../components/ScreenGrid';
import CityTable from './CityTable';
import InviteUserButton from '../components/buttons/InviteUserButton';
import ManageUsersButton from '../components/buttons/ManageUsersButton';

/**
 * A page only accessible to admins that displays all users in a table and allows
 * Admin to delete users from admin and promote users to admin.
 */
function MainDashboardPage() {
  useLayoutEffect(() => {
    document.body.style.backgroundColor = 'white';
  });
  return (
    <ScreenGrid>
      <Grid item>
        <Typography variant="h2">Admin Dashboard</Typography>
      </Grid>
      <Grid item container width="60vw" justifyContent="flex-end">
        <ManageUsersButton />
      </Grid>
      <Grid item>
        <div style={{ height: '60vh', width: '60vw' }}>
          <CityTable />
        </div>
      </Grid>
    </ScreenGrid>
  );
}

export default MainDashboardPage;
