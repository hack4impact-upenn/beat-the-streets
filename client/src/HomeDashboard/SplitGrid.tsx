import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/system';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from '@mui/material';
import { useData } from '../util/api';

const ScrollableBox = styled(Box)({
  overflowY: 'auto',
  maxHeight: '100%',
});

// eslint-disable-next-line
function createCityCard(city: any) {
  const name = city.cityName;
  const status = city.isAccredited;
  if (status) {
    return (
      <Paper sx={{ p: 2, bgcolor: '#EDEDED', mb: 2 }}>
        <Typography variant="h5">{name}</Typography>
        <Typography variant="subtitle1">Accredited</Typography>
      </Paper>
    );
  }
  return (
    <Paper sx={{ p: 2, bgcolor: '#EDEDED', mb: 2 }}>
      <Typography variant="h5">{name}</Typography>
      <Typography variant="subtitle1">Not Accredited</Typography>
    </Paper>
  );
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
      <Toolbar>{/* Add your toolbar content here */}</Toolbar>

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
          <div>
            {Array.from({ length: 50 }, (_, i) => (
              <p key={i}>Right Column Content {i + 1}</p>
            ))}
          </div>
        </Paper>
      </Box>
    </Box>
  );
}

export default SplitGrid;
