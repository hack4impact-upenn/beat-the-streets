import React, { useLayoutEffect } from 'react';
import { Typography, Grid } from '@mui/material';
import ScreenGrid from '../components/ScreenGrid';
import UserTable from './UserTable';
import InviteUserButton from '../components/buttons/InviteUserButton';

/**
 * M
 */

function CityDashboardPage() {
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
      <Grid item>
        <div style={{ height: '60vh', width: '60vw' }}>
          <Typography>Put the city table here</Typography>
        </div>
      </Grid>
    </Grid>
  );
}

export default CityDashboardPage;
