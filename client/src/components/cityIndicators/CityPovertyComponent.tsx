import React, { useEffect, useState } from 'react';
import { Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useData } from '../../util/api';
import ICity from '../../util/types/city';
import COLORS from '../../assets/colors';

type RevenueWidgetProps = {
  data1: any;
};

function Poverty({ data1 }: RevenueWidgetProps) {
  const cityData = data1;

  if (cityData) {
    const povertyList: { [key: number]: number } =
      cityData?.data.indicators.persons_in_poverty;

    const povertyValue =
      Object.values(povertyList)[Object.values(povertyList).length - 1];

    return (
      <Paper
        elevation={1}
        key={-1}
        sx={{ overflow: 'hidden', borderRadius: '16px' }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Poverty
          </Typography>
          <Typography variant="subtitle2" sx={{ color: COLORS.gray, mb: 1 }}>
            Number of persons in poverty
          </Typography>
          <Typography
            variant="h4"
            sx={{ color: COLORS.primaryBlue }}
            align="center"
          >
            {Intl.NumberFormat('en-US', {
              notation: 'compact',
              maximumFractionDigits: 1,
            }).format(povertyValue)}
          </Typography>
        </Box>
      </Paper>
    );
  }

  return <Paper elevation={0} key={-1} sx={{ overflow: 'hidden' }} />;
}

export default Poverty;
