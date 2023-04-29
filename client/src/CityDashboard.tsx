/* eslint-disable react/no-array-index-key */
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Masonry } from '@mui/lab';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Grid, Toolbar, Button, Icon } from '@mui/material';
import { useData } from './util/api';
import Header from './components/Header';
import PieComponent from './components/PieComponent';
import Under18 from './components/indicatorComponents/Under18';
import Poverty from './components/indicatorComponents/Poverty';
import CityNameWidget from './components/widgets/CityNameWidget';
import ParticipantsWidget from './components/widgets/ParticipantsWidget';
import MainParticipantsWidget from './components/widgets/MainParticipantsWidget';
import RevenueWidget from './components/widgets/RevenueWidget';
import CoachesWidget from './components/widgets/CoachesWidget';
import LineComponent from './components/LineComponent';
import Bachelor from './components/indicatorComponents/Bachelor';
import TotalChapters from './components/indicatorComponents/TotalChapters';
import HighSchoolGradsPercent from './components/indicatorComponents/HighSchoolGradsPercent';
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

  // TODO: this should navigate to the dashboard for all cities,
  // not the home page (once the all cities page exists)
  const navigator = useNavigate();
  const onNavigateMainDashboard = () => {
    navigator('/home');
  };

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
              <ParticipantsWidget city={name} />
              <MainParticipantsWidget />
              <PieComponent cityProp={name} />
              <CoachesWidget city={name} />
              <Under18 city={name} />
              <Poverty city={name} />
              <RevenueWidget city={name} variant="revenue" />
              <RevenueWidget city={name} variant="expenses" />
              <RevenueWidget city={name} variant="assets" />
              <Bachelor city={name} />
              <HighSchoolGradsPercent city={name} />

              {/* <LineComponent variant="revenue" />
              <LineComponent variant="expenses" />
              <TotalChapters /> */}
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
            <PieComponent cityProp={name} />
            <Under18 city={name} />
            <Poverty city={name} />
            <Bachelor city={name} />
            <HighSchoolGradsPercent city={name} />
          </Masonry>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CityDashboard;
