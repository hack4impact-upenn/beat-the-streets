import React, { useLayoutEffect } from 'react';
import { Typography, Grid } from '@mui/material';
import ScreenGrid from '../components/ScreenGrid';
import UserTable from './UserTable';
import InviteUserButton from '../components/buttons/InviteUserButton';

/**
 * A page only accessible to admins that displays all users in a table and allows
 * Admin to delete users from admin and promote users to admin.
 */
function UserDashboardPage() {
  useLayoutEffect(() => {
    document.body.style.backgroundColor = 'white';
  });

  return (
    <Grid
      container
      xs={12}
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Grid item container width="60vw" justifyContent="flex-end">
        <InviteUserButton />
      </Grid>
      <Grid item>
        <div style={{ height: '60vh', width: '60vw' }}>
          <UserTable />
        </div>
      </Grid>
    </Grid>
  );
}

export default UserDashboardPage;
