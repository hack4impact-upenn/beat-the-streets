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

function Under18({ data1 }: RevenueWidgetProps) {
  const cityData = data1;

  if (cityData) {
    const under18sList: { [key: number]: number } =
      cityData?.data.indicators.under18s;

    const under18sValue =
      Object.values(under18sList)[Object.values(under18sList).length - 1];

    return (
      <Paper
        elevation={1}
        key={-1}
        sx={{ overflow: 'hidden', borderRadius: '16px' }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Under 18s
          </Typography>
          <Typography variant="subtitle2" sx={{ color: COLORS.gray, mb: 1 }}>
            Number of persons under the age of 18
          </Typography>
          <Typography
            variant="h4"
            sx={{ color: COLORS.primaryBlue }}
            align="center"
          >
            {Intl.NumberFormat('en-US', {
              notation: 'compact',
              maximumFractionDigits: 1,
            }).format(under18sValue)}
          </Typography>
        </Box>
      </Paper>
    );
  }

  return <Paper elevation={0} key={-1} sx={{ overflow: 'hidden' }} />;
}

export default Under18;
