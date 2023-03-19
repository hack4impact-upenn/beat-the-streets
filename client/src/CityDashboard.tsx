/* eslint-disable react/no-array-index-key */
import React, { useLayoutEffect } from 'react';
import { Masonry } from '@mui/lab';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography, Grid, Toolbar } from '@mui/material';
import CityNameWidget from './components/widgets/CityNameWidget';

const heights = [150, 80, 90, 70, 110, 150];

/**
 * The Graph Page of the user dashboard.
 * Displays all the graphs.
 */
function CityDashboard() {
  useLayoutEffect(() => {
    document.body.style.backgroundColor = 'lightgray';
  });

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, paddingTop: 4, paddingLeft: 4, width: { sm: '100%' } }}
    >
      <Toolbar />

      <Grid container spacing={4}>
        <Grid item xs={4}>
          <CityNameWidget city="Philadelphia" />
        </Grid>
        <Grid item xs={8}>
          <Masonry columns={3} spacing={4}>
            {heights.map((height, ind) => (
              <Paper elevation={0} key={ind} sx={{ height, p: 3 }}>
                <Typography>add graph here: #{ind + 1}</Typography>
              </Paper>
            ))}
          </Masonry>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CityDashboard;
