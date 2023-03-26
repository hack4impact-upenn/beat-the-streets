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
  const [cityList, setCityList] = useState<ICity[]>([]);
  const [under18s, setUnder18s] = useState(new Map());
  const [poverty, setPoverty] = useState(new Map());
  const cityData = useData(`cities/${city}`);

  useEffect(() => {
    setCityList(cityData?.data);
    setUnder18s(cityData?.data.indicators.under18s);
    setPoverty(cityData?.data.indicators.persons_in_poverty);
  }, [cityData]);

  return (
    <Paper elevation={0} key={-1} sx={{ overflow: 'hidden' }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Under 18s
        </Typography>
        <Typography variant="subtitle2" sx={{ color: COLORS.gray, mb: 1 }}>
          Number of persons under the age of 18
        </Typography>
        {under18s !== undefined && (
          <Typography
            variant="h4"
            sx={{ color: COLORS.primaryBlue }}
            align="center"
          >
            {Object.entries(under18s)
              .filter(([year, value]) => year === '2022')
              .map(([year, value]) => (
                <h1 style={{ fontSize: '2.125rem', color: '#0175C0' }}>
                  {value}
                </h1>
              ))}
          </Typography>
        )}
      </Box>
    </Paper>
  );
}

export default Under18;
