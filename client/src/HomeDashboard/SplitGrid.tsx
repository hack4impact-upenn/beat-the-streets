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
import { useData } from '../util/api';
import TotalChapters from '../components/indicatorComponents/TotalChapters';
import TotalCoaches from '../components/indicatorComponents/TotalCoaches';
import TotalParticipants from '../components/indicatorComponents/TotalParticipants';
import LineComponent from '../components/LineComponent';
import CityCard from '../components/buttons/CityCard';

const ScrollableBox = styled(Box)({
  overflowY: 'auto',
  maxHeight: '100%',
});

const heights = [
  150, 80, 90, 70, 110, 150, 130, 200, 60, 90, 150, 80, 90, 200, 110, 150, 130,
  80, 60, 90,
];

// eslint-disable-next-line
function createCityCard(city: any) {
  const name = city.cityName;
  const status = city.isAccredited;
  return <CityCard cityName={name} accredited={status} />;

  // if (status) {
  //   return (
  //     <CityCard cityName={name} accredited={t} } />
  //     // <Card sx={{ p: 2, bgcolor: '#EDEDED', mb: 2 }}>
  //     //   <CardActionArea>
  //     //     <CardContent>
  //     //       <Typography variant="h5">{name}</Typography>
  //     //       <Typography variant="subtitle1">Accredited</Typography>
  //     //     </CardContent>
  //     //   </CardActionArea>
  //     // </Card>
  //   );
  // }
  // return (
  //   <Card sx={{ p: 2, bgcolor: '#EDEDED', mb: 2 }}>
  //     <CardActionArea>
  //       <CardContent onClick={() => console.log('Clicked!')}>
  //         <Typography variant="h5">{name}</Typography>
  //         <Typography variant="subtitle1">Not Accredited</Typography>
  //       </CardContent>
  //     </CardActionArea>
  //   </Card>
  // );
}

// eslint-disable-next-line
function createData(cityData: any) {
  return cityData.map(createCityCard);
}

function SplitGrid() {
  const cities = useData(`cities/all`);
  const cityData = cities?.data ?? [];

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
              <TotalChapters />
              <TotalCoaches />
              <TotalParticipants />
              <LineComponent variant="revenue" />
              <LineComponent variant="expenses" />
              {/* {heights.map((height) => (
                <Paper elevation={0} sx={{ height, p: 3 }}>
                  <Typography>add graph here</Typography>
                </Paper>
              ))} */}
            </Masonry>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
}

export default SplitGrid;
