/* eslint-disable react/no-array-index-key */
import React, { useLayoutEffect } from 'react';
import { Masonry } from '@mui/lab';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography, Grid, Toolbar, Button, Icon } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Under18 from './components/indicatorComponents/Under18';
import Poverty from './components/indicatorComponents/Poverty';
import CityNameWidget from './components/widgets/CityNameWidget';
import ParticipantsWidget from './components/widgets/ParticipantsWidget';
import RevenueWidget from './components/widgets/RevenueWidget';
import CoachesWidget from './components/widgets/CoachesWidget';

const heights = [150, 80, 90, 70, 110, 150, 130, 200, 60, 90, 150, 80, 90, 200];

/**
 * The Graph Page of the user dashboard.
 * Displays all the graphs.
 */
function CityDashboard() {
  useLayoutEffect(() => {
    document.body.style.backgroundColor = 'lightgray';
  });

  // TODO: this should navigate to the dashboard for all cities,
  // not the home page (once the all cities page exists)
  const navigator = useNavigate();
  const onNavigateMainDashboard = () => {
    navigator('/home');
  };

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, paddingTop: 4, paddingLeft: 4, width: { sm: '100%' } }}
    >
      <Toolbar />

      <Grid container spacing={4}>
        <Grid item xs={4}>
          <CityNameWidget city="Philadelphia" />
          <Button
            sx={{ mt: 2 }}
            variant="text"
            color="primary"
            onClick={onNavigateMainDashboard}
          >
            Back to all cities
          </Button>
        </Grid>
        <Grid item xs={8}>
          <Masonry columns={3} spacing={4}>
            <ParticipantsWidget city="Philadelphia" />
            <RevenueWidget city="Philadelphia" variant="revenue" />
            <RevenueWidget city="Philadelphia" variant="expenses" />
            <RevenueWidget city="Philadelphia" variant="assets" />
            <CoachesWidget city="Philadelphia" />
            <Under18 city="Philadelphia" />
            <Poverty city="Philadelphia" />
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
