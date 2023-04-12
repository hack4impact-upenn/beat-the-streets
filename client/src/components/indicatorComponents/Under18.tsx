import React, { useEffect, useState } from 'react';
import { Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useData } from '../../util/api';
import ICity from '../../util/types/city';
import COLORS from '../../assets/colors';

type RevenueWidgetProps = {
  city: string;
};

function Under18({ city }: RevenueWidgetProps) {
  const cityData = useData(`cities/${city}`);

  let under18s: number | null = null;

  const under18sList: { [key: number | string]: number } =
    cityData?.data.indicators.under18s;

  // Finds the most recent year in the data and uses that value
  if (under18sList) {
    let maxKey = '0';

    if (under18sList) {
      Object.entries(under18sList).forEach(function (key, value) {
        const [key1, value1] = key;
        if (parseInt(key1, 10) >= parseInt(maxKey, 10)) {
          maxKey = key1;
        }
      });
    }

    under18s = under18sList[maxKey];
  }

  return (
    <Paper elevation={0} key={-1} sx={{ overflow: 'hidden' }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Under 18s
        </Typography>
        <Typography variant="subtitle2" sx={{ color: COLORS.gray, mb: 1 }}>
          Number of persons under the age of 18
        </Typography>
        {under18s && (
          <Typography
            variant="h4"
            sx={{ color: COLORS.primaryBlue }}
            align="center"
          >
            {Intl.NumberFormat('en-US', {
              notation: 'compact',
              maximumFractionDigits: 1,
            }).format(under18s)}
          </Typography>
        )}
      </Box>
    </Paper>
  );
}

export default Under18;
