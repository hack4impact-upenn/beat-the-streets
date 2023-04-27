import React, { useEffect, useState } from 'react';
import { Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useData } from '../../util/api';
import COLORS from '../../assets/colors';

function TotalChapters() {
  const cityData = useData(`cities/all`);

  console.log(cityData);

  let sum = 0;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < cityData?.data.length; i++) {
    if (
      cityData?.data[i].isAccredited !== 0 &&
      cityData?.data[i].isAccredited !== null
    ) {
      sum += 1;
    }
  }

  return (
    <Paper elevation={0} key={-1} sx={{ overflow: 'hidden' }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Total Participants
        </Typography>
        <Typography variant="subtitle2" sx={{ color: COLORS.gray, mb: 1 }}>
          Active Chapters
        </Typography>
        {cityData !== undefined && (
          <Typography
            variant="h4"
            sx={{ color: COLORS.primaryBlue }}
            align="center"
          >
            <h1 style={{ fontSize: '2.125rem', color: '#0175C0' }}>{sum}</h1>
          </Typography>
        )}
      </Box>
    </Paper>
  );
}

export default TotalChapters;
