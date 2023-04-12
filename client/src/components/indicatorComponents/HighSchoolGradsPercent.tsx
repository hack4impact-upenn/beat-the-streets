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

function HighSchoolGradsPercent({ city }: RevenueWidgetProps) {
  const cityData = useData(`cities/${city}`);

  if (cityData) {
    const hsGraduateList: { [key: number]: number } =
      cityData?.data.indicators.high_school_graduates;

    const HSGraduateValue =
      Object.values(hsGraduateList)[Object.values(hsGraduateList).length - 1];

    return (
      <Paper elevation={0} key={-1} sx={{ overflow: 'hidden' }}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            High School Graduates
          </Typography>
          <Typography variant="subtitle2" sx={{ color: COLORS.gray, mb: 1 }}>
            High school graduate or higher, percent of persons age 25+
          </Typography>
          <Typography
            variant="h4"
            sx={{ color: COLORS.primaryBlue }}
            align="center"
          >
            {Intl.NumberFormat('en-US', {
              notation: 'compact',
              maximumFractionDigits: 1,
            }).format(HSGraduateValue)}
          </Typography>
        </Box>
      </Paper>
    );
  }

  return <Paper elevation={0} key={-1} sx={{ overflow: 'hidden' }} />;
}

export default HighSchoolGradsPercent;
