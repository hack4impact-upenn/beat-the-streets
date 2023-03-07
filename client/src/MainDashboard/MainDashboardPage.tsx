import React, { useLayoutEffect } from 'react';
import { Masonry } from '@mui/lab';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography, Grid, Toolbar } from '@mui/material';
import { useData } from '../util/api';

const heights = [
  150, 80, 90, 70, 110, 150, 130, 200, 60, 90, 150, 80, 90, 200, 110, 150, 130,
  80, 60, 90,
];

function createCityCard(city: any) {
  const name = city.cityName;
  const status = city.isAccredited;
  if (status) {
    return (
      <Paper sx={{ p: 2 }}>
        <Typography variant="h4">{name}</Typography>
        <Typography>Accredited</Typography>
      </Paper>
    );
  } else {
    return (
      <Paper sx={{ p: 2 }}>
        <Typography variant="h4">{name}</Typography>
        <Typography>Not Accredited</Typography>
      </Paper>
    );
  }
}

function createData(cityData: any) {
  return cityData.map(createCityCard);
}

/**
 * The Graph Page of the main dashboard.
 * Displays all the graphs and city accredations.
 */
function MainDashboard() {
  useLayoutEffect(() => {
    document.body.style.backgroundColor = 'lightgray';
  });

  //get all of the city names
  //put city name and accreditation in component
  const cities = useData(`cities/all`);
  let cityData = cities?.data;
  const statuses: string[] = [];

  if (cityData) {
    for (let i = 0; i < cityData.length; i++) {
      const name = cityData[i].cityName;
      const status = cityData[i].isAccredited;
      if (status) {
        statuses.push('Accredited');
      } else {
        statuses.push('Not Accredited');
      }
    }
  } else {
    cityData = [];
  }

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, paddingTop: 4, paddingLeft: 4, width: { sm: '100%' } }}
    >
      <Toolbar />

      <Grid container spacing={4}>
        <Grid item xs={3}>
          <Masonry columns={1} spacing={4}>
            {createData(cityData)}
          </Masonry>
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

export default MainDashboard;
