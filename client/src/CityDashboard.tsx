/* eslint-disable react/no-array-index-key */
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Masonry } from '@mui/lab';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Grid, Toolbar, Button, Icon } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useData } from './util/api';
import Header from './components/Header';
import PieComponent from './components/cityIndicators/CityPieComponent';
import Under18 from './components/cityIndicators/CityUnder18Component';
import Poverty from './components/cityIndicators/CityPovertyComponent';
import CityNameWidget from './components/cityIndicators/CityNameComponent';
import ParticipantsWidget from './components/cityIndicators/CityParticipantsComponent';
import RevenueWidget from './components/cityIndicators/CityLineComponent';
import CoachesWidget from './components/cityIndicators/CityCoachesComponent';
import LineComponent from './components/nationalIndicators/NationalLineComponent';
import Bachelor from './components/cityIndicators/CityBachelorComponent';
import TotalChapters from './components/nationalIndicators/NationalTotalChaptersComponent';
import HighSchoolGradsPercent from './components/cityIndicators/CityHighSchoolGradsPercentComponent';
import COLORS from './assets/colors';

// const heights = [150, 80, 90, 70, 110, 150, 130, 200, 60, 90, 150, 80, 90, 200];

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
    navigator('/home-dashboard');
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
            <CityNameWidget data1={cityData} />
            <Button
              sx={{ mt: 2 }}
              variant="text"
              color="primary"
              onClick={onNavigateMainDashboard}
              startIcon={<ArrowBack />}
            >
              Back to all cities
            </Button>
          </Grid>
          <Grid item xs={8}>
            <Masonry columns={3} spacing={4}>
              <ParticipantsWidget data={cityData} />
              <PieComponent data1={cityData} />
              <CoachesWidget data={cityData} />
              <Under18 data1={cityData} />
              <Poverty data1={cityData} />
              <RevenueWidget data1={cityData} variant="revenue" />
              <RevenueWidget data1={cityData} variant="expenses" />
              <RevenueWidget data1={cityData} variant="assets" />
              <Bachelor data1={cityData} />
              <HighSchoolGradsPercent data1={cityData} />

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
          <CityNameWidget data1={cityData} />
          <Button
            sx={{ mt: 2 }}
            variant="text"
            color="primary"
            onClick={onNavigateMainDashboard}
            startIcon={<ArrowBack />}
          >
            Back to all cities
          </Button>
        </Grid>
        <Grid item xs={8}>
          <Masonry columns={3} spacing={4}>
            <PieComponent data1={cityData} />
            <Under18 data1={cityData} />
            <Poverty data1={cityData} />
            <Bachelor data1={cityData} />
            <HighSchoolGradsPercent data1={cityData} />
          </Masonry>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CityDashboard;
