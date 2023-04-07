import { Box, Paper, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import 'chart.js/auto';
import { useData } from '../util/api';
import ICity from '../util/types/city';
import COLORS from '../assets/colors';

type PieComponentProps = {
  cityProp: string;
};

export default function PieComponent({ cityProp }: PieComponentProps) {
  const [asian, setAsian] = useState(0);
  const [hispanic, setHispanic] = useState(0);
  const [black, setBlack] = useState(0);
  const [total, setTotal] = useState(0);
  const [othersPercent, setOthersPercent] = useState(0);
  const [asianPercent, setAsianPercent] = useState(0);
  const [hispanicPercent, setHispanicPercent] = useState(0);
  const [blackPercent, setBlackPercent] = useState(0);

  const [asianList, setAsianList] = useState(new Map());
  const [hispanicList, setHispanicList] = useState(new Map());
  const [blackList, setBlackList] = useState(new Map());
  const [totalList, setTotalList] = useState(new Map());

  const cityName: string = cityProp;
  const city = useData(`cities/${cityName}`);

  useEffect(() => {
    setAsianList(city?.data.indicators.asian);
    setHispanicList(city?.data.indicators.hispanic_or_latino);
    setBlackList(city?.data.indicators.black_or_african_american);
    setTotalList(city?.data.indicators.population);

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
    if (asianList && total) {
      Object.entries(asianList).forEach(function (key, value) {
        const [key1, value1] = key;
        if (parseInt(key1, 10) >= parseInt(maxKey, 10)) {
          maxKey = key1;
          setAsian(value1);
          setAsianPercent((value1 * 100) / total);
        }
      });
    }
    if (hispanicList && total) {
      Object.entries(hispanicList).forEach(function (key, value) {
        const [key1, value1] = key;
        if (parseInt(key1, 10) >= parseInt(maxKey, 10)) {
          maxKey = key1;
          setHispanic(value1);
          setHispanicPercent((value1 * 100) / total);
        }
      });
    }
    if (blackList && total) {
      Object.entries(blackList).forEach(function (key, value) {
        const [key1, value1] = key;
        if (parseInt(key1, 10) >= parseInt(maxKey, 10)) {
          maxKey = key1;
          setBlack(value1);
          setBlackPercent((value1 * 100) / total);
        }
      });
    }
    if (total) {
      setOthersPercent(((total - (asian + hispanic + black)) * 100) / total);
    }
  }, [
    city,
    asian,
    black,
    hispanic,
    total,
    asianList,
    hispanicList,
    blackList,
    totalList,
  ]);

  console.log('hispanic');
  console.log(hispanicPercent);
  console.log(asianPercent);
  console.log(blackPercent);
  console.log('others');
  console.log(othersPercent);
  console.log(total);

  const options = {
    responsive: true,
    legend: {
      display: true,
      labels: {
        fontSize: 10,
      },
    },
  };

  const data = {
    labels: [
      'Asian',
      'Latino or Hispanic',
      'Black or African American',
      'Other',
    ],
    datasets: [
      {
        label: '% of population',
        data: [asianPercent, hispanicPercent, blackPercent, othersPercent],
        backgroundColor: [
          'rgba(38, 50, 56, 0.2)',
          'rgba(1, 117, 192, 0.2)',
          'rgba(1, 170, 255, 0.2)',
          'rgba(175, 211, 235, 0.2)',
        ],
        borderColor: [
          'rgba(38, 50, 56, 1)',
          'rgba(1, 117, 192, 1)',
          'rgba(1, 170, 255, 1)',
          'rgba(175, 211, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Toolbar />
      <Paper elevation={0} key={-1} sx={{ overflow: 'hidden' }}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Race and Hispanic Origin
          </Typography>
          <Typography variant="subtitle2" sx={{ color: COLORS.gray, mb: 1 }}>
            Breakdown of population by race and hispanic origin
          </Typography>
        </Box>

        <Box sx={{ p: 3 }}>
          <Pie options={options} data={data} />
        </Box>
      </Paper>
    </>
  );
}
