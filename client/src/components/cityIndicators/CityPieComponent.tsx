import { Box, Paper, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import 'chart.js/auto';
import { useData } from '../../util/api';
import ICity from '../../util/types/city';
import COLORS from '../../assets/colors';

type PieComponentProps = {
  data1: any;
};

export default function PieComponent({ data1 }: PieComponentProps) {
  const [asian, setAsian] = useState<number>(0);
  const [hispanic, setHispanic] = useState<number>(0);
  const [black, setBlack] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const [white, setWhite] = useState<number>(0);
  const [native, setNative] = useState<number>(0);
  const [hawaiian, setHawaiian] = useState<number>(0);
  const [twoOrMore, setTwoOrMore] = useState<number>(0);

  const [asianPercent, setAsianPercent] = useState<number>(0);
  const [hispanicPercent, setHispanicPercent] = useState<number>(0);
  const [blackPercent, setBlackPercent] = useState<number>(0);
  const [whitePercent, setWhitePercent] = useState<number>(0);
  const [nativePercent, setNativePercent] = useState<number>(0);
  const [hawaiianPercent, setHawaiianPercent] = useState<number>(0);
  const [twoOrMorePercent, setTwoOrMorePercent] = useState<number>(0);

  const [asianList, setAsianList] = useState<Record<string, number>>({});
  const [hispanicList, setHispanicList] = useState<Record<string, number>>({});
  const [blackList, setBlackList] = useState<Record<string, number>>({});
  const [totalList, setTotalList] = useState<Record<string, number>>({});

  const [whiteList, setWhiteList] = useState<Record<string, number>>({});
  const [hawaiianList, setHawaiianList] = useState<Record<string, number>>({});
  const [nativeList, setNativeList] = useState<Record<string, number>>({});
  const [twoOrMoreList, setTwoOrMoreList] = useState<Record<string, number>>(
    {},
  );

  const city = data1;

  useEffect(() => {
    setAsianList(city?.data.indicators.asian || {});
    setHispanicList(city?.data.indicators.hispanic_or_latino || {});
    setBlackList(city?.data.indicators.black_or_african_american || {});
    setWhiteList(city?.data.indicators.white || {});
    setNativeList(city?.data.indicators.american_indian_alaskan_native || {});
    setHawaiianList(
      city?.data.indicators.native_hawaiian_pacific_islander || {},
    );
    setTwoOrMoreList(city?.data.indicators.two_or_more || {});

    const getMostRecentNonZero = (list: Record<string, number>) => {
      const years = Object.keys(list).sort((a, b) => Number(b) - Number(a));

      // eslint-disable-next-line no-restricted-syntax
      for (const year of years) {
        const value = list[year];

        if (value !== 0) {
          return value;
        }
      }

      return 0;
    };

    if (asianList) setAsian(getMostRecentNonZero(asianList));
    if (hispanicList) setHispanic(getMostRecentNonZero(hispanicList));
    if (blackList) setBlack(getMostRecentNonZero(blackList));
    if (whiteList) setWhite(getMostRecentNonZero(whiteList));
    if (nativeList) setNative(getMostRecentNonZero(nativeList));
    if (hawaiianList) setHawaiian(getMostRecentNonZero(hawaiianList));
    if (twoOrMoreList) setTwoOrMore(getMostRecentNonZero(twoOrMoreList));
  }, [
    asianList,
    blackList,
    city,
    hawaiianList,
    hispanicList,
    nativeList,
    twoOrMoreList,
    whiteList,
  ]);

  useEffect(() => {
    const sum =
      asian + hispanic + black + white + native + hawaiian + twoOrMore;
    setAsianPercent((asian * 100) / sum);
    setHispanicPercent((hispanic * 100) / sum);
    setBlackPercent((black * 100) / sum);
    setWhitePercent((white * 100) / sum);
    setNativePercent((native * 100) / sum);
    setHawaiianPercent((hawaiian * 100) / sum);
    setTwoOrMorePercent((twoOrMore * 100) / sum);
  }, [asian, hispanic, black, white, native, hawaiian, twoOrMore]);

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
        ],
        backgroundColor: [
          'rgba(219,243,255, 1)',
          'rgba(1, 117, 192, 1)',
          'rgba(1, 170, 255, 1)',
          'rgba(175, 211, 235, 1)',
          'rgba(219,243,255, 1)',
          'rgba(38, 50, 56, 1)',
          'rgba(99, 143, 172, 1)',
          'rgba(0, 89, 134, 1)',
        ],
        borderColor: [
          'rgba(219,243,255, 1)',
          'rgba(1, 117, 192, 1)',
          'rgba(1, 170, 255, 1)',
          'rgba(175, 211, 235, 1)',
          'rgba(219,243,255, 1)',
          'rgba(38, 50, 56, 1)',
          'rgba(99, 143, 172, 1)',
          'rgba(0, 89, 134, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Paper
      elevation={1}
      key={-1}
      sx={{ overflow: 'hidden', borderRadius: '16px' }}
    >
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
  );
}
