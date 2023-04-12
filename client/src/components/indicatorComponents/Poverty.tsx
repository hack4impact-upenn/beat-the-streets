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

function Poverty({ city }: RevenueWidgetProps) {
  const cityData = useData(`cities/${city}`);

  let poverty: number | null = null;

  const povertList: { [key: number | string]: number } =
    cityData?.data.indicators.persons_in_poverty;

  // Finds the most recent year in the data and uses that value
  if (povertList) {
    let maxKey = '0';

    if (povertList) {
      Object.entries(povertList).forEach(function (key, value) {
        const [key1, value1] = key;
        if (parseInt(key1, 10) >= parseInt(maxKey, 10)) {
          maxKey = key1;
        }
      });
    }

    poverty = povertList[maxKey];
  }

  return (
    <Paper elevation={0} key={-1} sx={{ overflow: 'hidden' }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Poverty
        </Typography>
        <Typography variant="subtitle2" sx={{ color: COLORS.gray, mb: 1 }}>
          Number of persons in poverty
        </Typography>
        {poverty && (
          <Typography
            variant="h4"
            sx={{ color: COLORS.primaryBlue }}
            align="center"
          >
            {Intl.NumberFormat('en-US', {
              notation: 'compact',
              maximumFractionDigits: 1,
            }).format(poverty)}
          </Typography>
        )}
      </Box>
    </Paper>
  );
}

export default Poverty;
