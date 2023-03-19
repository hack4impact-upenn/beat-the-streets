import React, { useEffect, useState } from 'react';
import { Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useData } from '../../util/api';
import ICity from '../../util/types/city';

function Under18() {
  const [cityList, setCityList] = useState<ICity[]>([]);
  const [under18s, setUnder18s] = useState(new Map());
  const [poverty, setPoverty] = useState(new Map());
  const city = useData('cities/Philadelphia');

  useEffect(() => {
    setCityList(city?.data);
    setUnder18s(city?.data.indicators.under18s);
    setPoverty(city?.data.indicators.persons_in_poverty);
  }, [city]);

  return (
    <Card sx={{ maxWidth: 500, marginTop: 10, marginLeft: 10 }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 30, fontWeight: 'bold' }}
          color="text.primary"
          gutterBottom
        >
          Under 18s
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Number of persons under the age of 18
        </Typography>
        <Box justifyContent="center" display="flex">
          {under18s !== undefined && (
            <ul>
              {Object.entries(under18s)
                .filter(([year, value]) => year === '2022')
                .map(([year, value]) => (
                  <h1 style={{ fontSize: 40, color: '#0175C0' }}>{value}</h1>
                ))}
            </ul>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

export default Under18;
