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

  const [white, setWhite] = useState(0);
  const [native, setNative] = useState(0);
  const [hawaiian, setHawaiian] = useState(0);
  const [twoOrMore, setTwoOrMore] = useState(0);

  const [othersPercent, setOthersPercent] = useState(0);
  const [asianPercent, setAsianPercent] = useState(0);
  const [hispanicPercent, setHispanicPercent] = useState(0);
  const [blackPercent, setBlackPercent] = useState(0);
  const [whitePercent, setWhitePercent] = useState(0);
  const [nativePercent, setNativePercent] = useState(0);
  const [hawaiianPercent, setHawaiianPercent] = useState(0);
  const [twoOrMorePercent, setTwoOrMorePercent] = useState(0);

  const [asianList, setAsianList] = useState(new Map());
  const [hispanicList, setHispanicList] = useState(new Map());
  const [blackList, setBlackList] = useState(new Map());
  const [totalList, setTotalList] = useState(new Map());

  const [whiteList, setWhiteList] = useState(new Map());
  const [hawaiianList, setHawaiianList] = useState(new Map());
  const [nativeList, setNativeList] = useState(new Map());
  const [twoOrMoreList, setTwoOrMoreList] = useState(new Map());

  const cityName: string = cityProp;
  const city = useData(`cities/${cityName}`);

  useEffect(() => {
    setAsianList(city?.data.indicators.asian);
    setHispanicList(city?.data.indicators.hispanic_or_latino);
    setBlackList(city?.data.indicators.black_or_african_american);
    setWhiteList(city?.data.indicators.white);
    setNativeList(city?.data.indicators.native);
    setHawaiianList(city?.data.indicators.hawaiian);
    setTwoOrMoreList(city?.data.indicators.two_or_more);

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

    if (whiteList && total) {
      Object.entries(whiteList).forEach(function (key, value) {
        const [key1, value1] = key;
        if (parseInt(key1, 10) >= parseInt(maxKey, 10)) {
          maxKey = key1;
          setWhite(value1);
          setWhitePercent((value1 * 100) / total);
        }
      });
    }

    if (nativeList && total) {
      Object.entries(nativeList).forEach(function (key, value) {
        const [key1, value1] = key;
        if (parseInt(key1, 10) >= parseInt(maxKey, 10)) {
          maxKey = key1;
          setNative(value1);
          setNativePercent((value1 * 100) / total);
        }
      });
    }

    if (hawaiianList && total) {
      Object.entries(hawaiianList).forEach(function (key, value) {
        const [key1, value1] = key;
        if (parseInt(key1, 10) >= parseInt(maxKey, 10)) {
          maxKey = key1;
          setHawaiian(value1);
          setHawaiianPercent((value1 * 100) / total);
        }
      });
    }

    if (twoOrMoreList && total) {
      Object.entries(twoOrMoreList).forEach(function (key, value) {
        const [key1, value1] = key;
        if (parseInt(key1, 10) >= parseInt(maxKey, 10)) {
          maxKey = key1;
          setTwoOrMore(value1);
          setTwoOrMorePercent((value1 * 100) / total);
        }
      });
    }

    if (total) {
      setOthersPercent(
        ((total -
          (asian + hispanic + black + white + native + hawaiian + twoOrMore)) *
          100) /
          total,
      );
    }
  }, [
    city,
    asian,
    black,
    hispanic,
    total,

    white,
    native,
    hawaiian,
    twoOrMore,

    asianList,
    hispanicList,
    blackList,
    totalList,

    whiteList,
    nativeList,
    hawaiianList,
    twoOrMoreList,
  ]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const data = {
    labels: [
      'Asian',
      'Latino or Hispanic',
      'Black or African American',
      'White',
      'Native',
      'Hawaiian',
      'Two or more',
      'Other',
    ],
    datasets: [
      {
        label: '% of population',
        data: [
          asianPercent,
          hispanicPercent,
          blackPercent,
          whitePercent,
          nativePercent,
          hawaiianPercent,
          twoOrMorePercent,
          othersPercent,
        ],
        backgroundColor: [
          'rgba(38, 50, 56, 1)',
          'rgba(1, 117, 192, 1)',
          'rgba(1, 170, 255, 1)',
          'rgba(175, 211, 235, 1)',
          'rgba(138, 150, 56, 1)',
          'rgba(62, 107, 192, 1)',
          'rgba(0, 89, 134, 1)',
          'rgba(99, 143, 172, 1)',
        ],
        borderColor: [
          'rgba(38, 50, 56, 0.2)',
          'rgba(1, 117, 192, 0.2)',
          'rgba(1, 170, 255, 0.2)',
          'rgba(175, 211, 235, 0.2)',
          'rgba(138, 150, 56, 0.2)',
          'rgba(62, 107, 192, 0.2)',
          'rgba(62, 1, 255, 0.2)',
          'rgba(62, 211, 1, 0.2)',
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
