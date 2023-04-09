/* eslint-disable react/no-array-index-key */
import React, { useLayoutEffect } from 'react';
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

const heights = [150, 80, 90, 70, 110, 150, 130, 200, 60, 90, 150, 80, 90, 200];

/**
 * The Graph Page of the user dashboard.
 * Displays all the graphs.
 */
function CityDashboard() {
  let { cityID } = useParams();
  if (!cityID) {
    cityID = '641fbbde2cc3b4a2a06b4d56';
  }

  const cityData = useData(`cities/cityName/${cityID}`);
  const cityName = cityData?.data.cityName;

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
          <CityNameWidget city={cityName} />
        </Grid>
        <Grid item xs={8}>
          <Masonry columns={3} spacing={4}>
            <ParticipantsWidget city={cityName} />
            <RevenueWidget city={cityName} variant="revenue" />
            <RevenueWidget city={cityName} variant="expenses" />
            <RevenueWidget city={cityName} variant="assets" />
            <CoachesWidget city={cityName} />
            <Under18 city={cityName} />
            <Poverty city={cityName} />
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
