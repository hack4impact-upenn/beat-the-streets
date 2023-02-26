import React, { useEffect, useState } from 'react';
import { Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { useData } from '../../util/api';
import ICity from '../../util/types/city';

function Poverty() {
  const [cityList, setCityList] = useState<ICity[]>([]);
  const [poverty, setPoverty] = useState(new Map());
  const city = useData('cities/Philadelphia');

  useEffect(() => {
    setCityList(city?.data);
    setPoverty(city?.data.indicators.persons_in_poverty);
  }, [city]);

  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 30, fontWeight: 'bold' }}
          color="text.primary"
          gutterBottom
        >
          Poverty
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Persons in Poverty
        </Typography>
        <Box justifyContent="center" display="flex">
          {poverty !== undefined && (
            <ul>
              {Object.entries(poverty)
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

export default Poverty;
