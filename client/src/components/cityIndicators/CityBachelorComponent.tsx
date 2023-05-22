/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ICity from '../../util/types/city';
import COLORS from '../../assets/colors';

type BachelorProps = {
  data1: any;
};

function Bachelor({ data1 }: BachelorProps) {
  const [bachelor, setBachelor] = useState(0);
  const [total, setTotal] = useState(0);

  const cityData = data1;

  useEffect(() => {
    const bachelorList = cityData?.data.indicators.bachelor;
    const totalList = cityData?.data.indicators.population;

    if (totalList) {
      const totalKeys = Object.keys(totalList).sort().reverse();
      for (let i = 0; i < totalKeys.length; i++) {
        const key = totalKeys[i];
        const totalValue = totalList[key];
        if (totalValue && totalValue !== 0) {
          setTotal(totalValue);
          break;
        }
      }
    }

    if (bachelorList) {
      const bachelorKeys = Object.keys(bachelorList).sort().reverse();
      for (let i = 0; i < bachelorKeys.length; i++) {
        const key = bachelorKeys[i];
        const bachelorValue = bachelorList[key];
        if (bachelorValue && bachelorValue !== 0) {
          setBachelor(bachelorValue);
          break;
        }
      }
    }
  }, [cityData]);

  return (
    <Paper
      elevation={1}
      key={-1}
      sx={{ overflow: 'hidden', borderRadius: '16px' }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Bachelor&apos;s degree
        </Typography>
        <Typography variant="subtitle2" sx={{ color: COLORS.gray, mb: 1 }}>
          Percent of persons age 25+ with Bachelor&apos;s degree or higher
        </Typography>
        {bachelor !== undefined && total !== undefined && total !== 0 && (
          <Typography
            variant="h4"
            sx={{ color: COLORS.primaryBlue }}
            align="center"
          >
            <h1 style={{ fontSize: '2.125rem', color: '#0175C0' }}>
              {Math.round((bachelor * 100) / total)}%
            </h1>
          </Typography>
        )}
      </Box>
    </Paper>
  );
}

export default Bachelor;
