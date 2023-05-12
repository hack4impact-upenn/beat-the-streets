import React, { useEffect, useState } from 'react';
import { Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useData } from '../../util/api';
import COLORS from '../../assets/colors';

type DefaultWidgetProps = {
  data1: any;
};

function TotalChapters({ data1 }: DefaultWidgetProps) {
  const cityData = data1;

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
    <Paper
      elevation={0}
      key={-1}
      sx={{ overflow: 'hidden', borderRadius: '16px' }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Total Chapters
        </Typography>
        <Typography variant="subtitle2" sx={{ color: COLORS.gray, mb: 1 }}>
          Total number of active chapters
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
