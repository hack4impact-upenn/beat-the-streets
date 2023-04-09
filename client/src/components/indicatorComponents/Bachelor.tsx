import React, { useEffect, useState } from 'react';
import { Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useData } from '../../util/api';
import ICity from '../../util/types/city';
import COLORS from '../../assets/colors';

type BachelorProps = {
  city: string;
};

function Bachelor({ city }: BachelorProps) {
  const [cityList, setCityList] = useState<ICity[]>([]);
  const [bachelor, setBachelor] = useState(0);
  const [total, setTotal] = useState(0);
  const [under25, setUnder25] = useState(0);
  const [totalList, setTotalList] = useState(new Map());
  const [under25List, setUnder25List] = useState(new Map());
  const [bachelorList, setBachelorList] = useState(new Map());

  const cityData = useData(`cities/${city}`);

  useEffect(() => {
    setCityList(cityData?.data);
    setBachelorList(cityData?.data.indicators.bachelor);
    setUnder25List(cityData?.data.indicators.under25s);
    setTotalList(cityData?.data.indicators.population);

    let maxKey = '0';
    if (totalList) {
      Object.entries(totalList).forEach(function (key, value) {
        const [key1, value1] = key;
        if (parseInt(key1, 10) >= parseInt(maxKey, 10)) {
          maxKey = key1;
          setTotal(value1);
        }
      });
    }
    if (bachelorList) {
      Object.entries(bachelorList).forEach(function (key, value) {
        const [key1, value1] = key;
        if (parseInt(key1, 10) >= parseInt(maxKey, 10)) {
          maxKey = key1;
          setBachelor(value1);
        }
      });
    }
    if (under25List) {
      Object.entries(under25List).forEach(function (key, value) {
        const [key1, value1] = key;
        if (parseInt(key1, 10) >= parseInt(maxKey, 10)) {
          maxKey = key1;
          setUnder25(value1);
        }
      });
    }
    console.log(bachelor);
    console.log(total);
  }, [bachelor, bachelorList, cityData, total, totalList, under25List]);

  return (
    <Paper elevation={0} key={-1} sx={{ overflow: 'hidden' }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Bachelor&apos;s degree
        </Typography>
        <Typography variant="subtitle2" sx={{ color: COLORS.gray, mb: 1 }}>
          Percent of persons age 25+ with Bachelor&apos;s degree or higher
        </Typography>
        {bachelor !== undefined && (
          <Typography
            variant="h4"
            sx={{ color: COLORS.primaryBlue }}
            align="center"
          >
            <h1 style={{ fontSize: '2.125rem', color: '#0175C0' }}>
              {Math.round((bachelor * 100) / under25)}%
            </h1>
            {/* <h1 style={{ fontSize: '2.125rem', color: '#0175C0' }}>{total}</h1> */}
          </Typography>
        )}
      </Box>
    </Paper>
  );
}

export default Bachelor;
