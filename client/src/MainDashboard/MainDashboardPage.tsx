import React, { useState, useLayoutEffect } from 'react'
import { Masonry } from '@mui/lab';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography, Grid, Toolbar } from '@mui/material';
import { useData } from '../util/api';
import SplitPane, { Pane } from 'split-pane-react';

const heights = [
  150, 80, 90, 70, 110, 150, 130, 200, 60, 90, 150, 80, 90, 200, 110, 150, 130,
  80, 60, 90,
];

// eslint-disable-next-line
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
  }
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h4">{name}</Typography>
      <Typography>Not Accredited</Typography>
    </Paper>
  );
}

// eslint-disable-next-line
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

  const cities = useData(`cities/all`);
  let cityData = cities?.data;
  const statuses: string[] = [];

  const [sizes, setSizes] = useState([100, '30%', 'auto']);

  if (cityData) {
    for (let i = 0; i < cityData.length; i += 1) {
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
      <SplitPane
        split='vertical'
        sizes={sizes}
        onChange={setSizes}
      >
        <Pane>
          <Grid item xs={3}>
            <Masonry columns={1} spacing={4}>
              {createData(cityData)}
            </Masonry>
          </Grid>
        </Pane>

        <Pane>
          <Grid item xs={8}>
            <Masonry columns={3} spacing={4}>
              {heights.map((height) => (
                <Paper elevation={0} sx={{ height, p: 3 }}>
                  <Typography>add graph here</Typography>
                </Paper>
              ))}
            </Masonry>
          </Grid>
        </Pane>
      </SplitPane>
    </Box>
  );
}

export default MainDashboard;
