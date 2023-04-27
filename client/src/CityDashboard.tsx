/* eslint-disable react/no-array-index-key */
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Masonry } from '@mui/lab';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography, Grid, Toolbar } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useData } from './util/api';
import Under18 from './components/indicatorComponents/Under18';
import Poverty from './components/indicatorComponents/Poverty';
import CityNameWidget from './components/widgets/CityNameWidget';
import ParticipantsWidget from './components/widgets/ParticipantsWidget';
import RevenueWidget from './components/widgets/RevenueWidget';
import CoachesWidget from './components/widgets/CoachesWidget';
import COLORS from './assets/colors';

const heights = [150, 80, 90, 70, 110, 150, 130, 200, 60, 90, 150, 80, 90, 200];

/**
 * The Graph Page of the user dashboard.
 * Displays all the graphs.
 */
function CityDashboard() {
  const { cityName } = useParams();
  const cityData = useData(`cities/${cityName}`);

  const [isAccredited, setIsAccredited] = useState(false);

  let name = cityName;
  if (!name) {
    name = 'Philadelphia city, Pennsylvania';
  }

  useLayoutEffect(() => {
    document.body.style.backgroundColor = COLORS.lightGray;
  });

  useEffect(() => {
    setIsAccredited(cityData?.data.isAccredited);
  }, [cityData]);

  if (isAccredited) {
    console.log('true');
    return (
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          paddingTop: 4,
          paddingLeft: 4,
          width: { sm: '100%' },
        }}
      >
        <Toolbar />

        <Grid container spacing={4}>
          <Grid item xs={4}>
            <CityNameWidget city={name} />
          </Grid>
          <Grid item xs={8}>
            <Masonry columns={3} spacing={4}>
              <ParticipantsWidget city={name} />
              <RevenueWidget city={name} variant="revenue" />
              <RevenueWidget city={name} variant="expenses" />
              <RevenueWidget city={name} variant="assets" />
              <CoachesWidget city={name} />
              <Under18 city={name} />
              <Poverty city={name} />
            </Masonry>
          </Grid>
        </Grid>
      </Box>
    );
  }
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        paddingTop: 4,
        paddingLeft: 4,
        width: { sm: '100%' },
      }}
    >
      <Toolbar />

      <Grid container spacing={4}>
        <Grid item xs={4}>
          <CityNameWidget city={name} />
        </Grid>
        <Grid item xs={8}>
          <Masonry columns={3} spacing={4}>
            <Under18 city={name} />
            <Poverty city={name} />
          </Masonry>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CityDashboard;
