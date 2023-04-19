/* eslint-disable react/no-array-index-key */
import React, { useLayoutEffect } from 'react';
import { Masonry } from '@mui/lab';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography, Grid, Toolbar } from '@mui/material';
import Header from './components/Header';
import PieComponent from './components/PieComponent';
import Under18 from './components/indicatorComponents/Under18';
import Poverty from './components/indicatorComponents/Poverty';
import CityNameWidget from './components/widgets/CityNameWidget';
import ParticipantsWidget from './components/widgets/ParticipantsWidget';
import RevenueWidget from './components/widgets/RevenueWidget';
import CoachesWidget from './components/widgets/CoachesWidget';
import LineComponent from './components/LineComponent';
import Bachelor from './components/indicatorComponents/Bachelor';

const heights = [150, 80, 90, 70, 110, 150, 130, 200, 60, 90, 150, 80, 90, 200];

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
          <CityNameWidget city="Philadelphia city, Pennsylvania" />
        </Grid>
        <Grid item xs={8}>
          <Masonry columns={3} spacing={4}>
            <ParticipantsWidget city="Philadelphia city, Pennsylvania" />
            <RevenueWidget
              city="Philadelphia city, Pennsylvania"
              variant="revenue"
            />
            <RevenueWidget
              city="Philadelphia city, Pennsylvania"
              variant="expenses"
            />
            <RevenueWidget
              city="Philadelphia city, Pennsylvania"
              variant="assets"
            />
            <Bachelor city="Philadelphia city, Pennsylvania" />
            <CoachesWidget city="Philadelphia city, Pennsylvania" />
            <Under18 city="Philadelphia city, Pennsylvania" />
            <Poverty city="Philadelphia city, Pennsylvania" />
            <LineComponent variant="revenue" />
            <LineComponent variant="expenses" />
            <PieComponent cityProp="Philadelphia city, Pennsylvania" />
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
