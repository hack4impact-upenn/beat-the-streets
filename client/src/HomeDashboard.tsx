import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/system';
import Toolbar from '@mui/material/Toolbar';
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { Masonry } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { useData } from './util/api';
import TotalChapters from './components/nationalIndicators/NationalTotalChaptersComponent';
import TotalCoaches from './components/nationalIndicators/NationalTotalCoachesComponent';
import TotalParticipants from './components/nationalIndicators/NationalTotalParticipantsComponent';
import LineComponent from './components/nationalIndicators/NationalLineComponent';
import CityCard from './components/buttons/CityCard';
import MainPieComponent from './components/nationalIndicators/NationalPieComponent';
import MainCoachesWidget from './components/nationalIndicators/NationalCoachesComponent';
import ActiveCitiesWidget from './components/nationalIndicators/NationalActiveCitiesComponent';
import MainParticipantsWidget from './components/nationalIndicators/NationalParticipantsComponent';

const ScrollableBox = styled(Box)({
  overflowY: 'auto',
  maxHeight: '100%',
});

// const heights = [
//   150, 80, 90, 70, 110, 150, 130, 200, 60, 90, 150, 80, 90, 200, 110, 150, 130,
//   80, 60, 90,
// ];

// eslint-disable-next-line
function createCityCard(city: any) {
  const name = city.cityName;
  const status = city.isAccredited;
  return <CityCard cityName={name} accredited={status} />;
}

// eslint-disable-next-line
function createData(cityData: any) {
  return cityData.map(createCityCard);
}

function SplitGrid() {
  const cities = useData(`cities/all`);
  const cityData = cities?.data ?? [];
  const maleData = useData(`cities/indicator/male_coaches`);
  const femaleData = useData(`cities/indicator/female_coaches`);
  const maleParticpants = useData(`cities/indicator/male_participants`);
  const femaleParticpants = useData(`cities/indicator/female_participants`);
  const revenueData = useData('cities/indicatoryearly/revenue');
  const expensesData = useData('cities/indicatoryearly/expenses');
  const asianMain = useData('cities/indicator/asian');
  const hispanicMain = useData('cities/indicator/hispanic_or_latino');
  const blackMain = useData('cities/indicator/black_or_african_american');
  const whiteMain = useData('cities/indicator/white');
  const nativeMain = useData('cities/indicator/american_indian_alaskan_native');
  const hawaiiamMain = useData(
    'cities/indicator/native_hawaiian_pacific_islander',
  );
  const twoMain = useData('cities/indicator/two_or_more');

  return (
    <Box display="flex" flexDirection="column" width="100%" height="100vh">
      <Toolbar />

      <Box display="flex" flexGrow={1}>
        <Paper
          sx={{
            width: '30%',
            overflowY: 'auto',
            maxHeight: 'calc(100vh - 64px)', // Subtract the Toolbar height (default is 64px)
            bgcolor: 'white',
            p: 2,
          }}
          elevation={0}
          square
        >
          <h2>Cities</h2>
          {createData(cityData)}
        </Paper>

        <Paper
          sx={{
            width: '70%',
            overflowY: 'auto',
            maxHeight: 'calc(100vh - 64px)', // Subtract the Toolbar height (default is 64px)
            bgcolor: '#EDEDED',
            p: 2,
          }}
          elevation={0}
          square
        >
          <h2>National Statistics</h2>
          <Grid item xs={8}>
            <Masonry columns={3} spacing={4}>
              <TotalChapters data1={cities} />
              <TotalCoaches maleData1={maleData} femaleData1={femaleData} />
              <TotalParticipants
                maleParticpants1={maleParticpants}
                femaleParticpants1={femaleParticpants}
              />
              <LineComponent variant="revenue" data1={revenueData} />
              <LineComponent variant="expenses" data1={expensesData} />
              <MainPieComponent
                asianMain1={asianMain}
                hispanicMain1={hispanicMain}
                blackMain1={blackMain}
                whiteMain1={whiteMain}
                nativeMain1={nativeMain}
                hawaiiamMain1={hawaiiamMain}
                twoMain1={twoMain}
              />
              <MainCoachesWidget
                maleData1={maleData}
                femaleData1={femaleData}
              />
              <ActiveCitiesWidget cities1={cities} />
              <MainParticipantsWidget
                maleParticpants1={maleParticpants}
                femaleParticpants1={femaleParticpants}
              />
            </Masonry>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
}

export default SplitGrid;
