import { Box, Paper, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import 'chart.js/auto';
import { useData } from '../../util/api';
import ICity from '../../util/types/city';
import COLORS from '../../assets/colors';

type DefaultWidgetProps = {
  asianMain1: any;
  hispanicMain1: any;
  blackMain1: any;
  whiteMain1: any;
  nativeMain1: any;
  hawaiiamMain1: any;
  twoMain1: any;
};

export default function MainPieComponent({
  asianMain1,
  hispanicMain1,
  blackMain1,
  whiteMain1,
  nativeMain1,
  hawaiiamMain1,
  twoMain1,
}: DefaultWidgetProps) {
  let asianTotal = 0;
  const asianMain = asianMain1;
  if (asianMain) {
    asianTotal =
      asianMain?.data?.reduce(
        (accumulator: any, currentValue: any) => accumulator + currentValue,
        0,
      ) || 0;
  }
  //   console.log(`asian: ${asianTotal}`);

  let hispanicTotal = 0;
  const hispanicMain = hispanicMain1;
  if (hispanicMain) {
    hispanicTotal =
      hispanicMain?.data?.reduce(
        (accumulator: any, currentValue: any) => accumulator + currentValue,
        0,
      ) || 0;
  }
  let blackTotal = 0;
  const blackMain = blackMain1;
  if (blackMain) {
    blackTotal =
      blackMain?.data?.reduce(
        (accumulator: any, currentValue: any) => accumulator + currentValue,
        0,
      ) || 0;
  }
  let whiteTotal = 0;
  const whiteMain = whiteMain1;
  if (whiteMain) {
    whiteTotal =
      whiteMain?.data?.reduce(
        (accumulator: any, currentValue: any) => accumulator + currentValue,
        0,
      ) || 0;
  }
  let nativeTotal = 0;
  const nativeMain = nativeMain1;
  if (nativeMain) {
    nativeTotal =
      nativeMain?.data?.reduce(
        (accumulator: any, currentValue: any) => accumulator + currentValue,
        0,
      ) || 0;
  }
  let hawaiianTotal = 0;
  const hawaiiamMain = hawaiiamMain1;
  if (hawaiiamMain) {
    hawaiianTotal =
      hawaiiamMain?.data?.reduce(
        (accumulator: any, currentValue: any) => accumulator + currentValue,
        0,
      ) || 0;
  }
  let twoTotal = 0;
  const twoMain = twoMain1;
  if (twoMain) {
    twoTotal =
      twoMain?.data?.reduce(
        (accumulator: any, currentValue: any) => accumulator + currentValue,
        0,
      ) || 0;
  }

  const sum =
    asianTotal +
    hispanicTotal +
    blackTotal +
    whiteTotal +
    nativeTotal +
    hawaiianTotal +
    twoTotal;
  const asianPercent = (asianTotal * 100) / sum;
  const hispanicPercent = (hispanicTotal * 100) / sum;
  const blackPercent = (blackTotal * 100) / sum;
  const whitePercent = (whiteTotal * 100) / sum;
  const nativePercent = (nativeTotal * 100) / sum;
  const hawaiianPercent = (hawaiianTotal * 100) / sum;
  const twoPercent = (twoTotal * 100) / sum;

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
          twoPercent,
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
          Breakdown of population across cities by race and hispanic origin
        </Typography>
      </Box>

      <Box sx={{ p: 3 }}>
        <Pie options={options} data={data} />
      </Box>
    </Paper>
  );
}
