import { Box, Paper, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import 'chart.js/auto';
import { useData } from '../util/api';
import ICity from '../util/types/city';
import COLORS from '../assets/colors';

type LineComponentProps = {
  variant: 'revenue' | 'expenses';
};

export default function LineComponent({ variant }: LineComponentProps) {
  const descriptions = {
    revenue: 'Yearly Network Revenue',
    expenses: 'Yearly Network Expenses',
  };
  let api = '';
  if (variant === 'revenue') {
    api = 'cities/indicatoryearly/revenue';
  } else {
    api = 'cities/indicatoryearly/expenses';
  }

  const apiData = useData(api);
  const year: string[] = [];
  const dataValues: unknown[] = [];
  let dataTotal = 0;

  if (apiData?.data) {
    // eslint-disable-next-line func-names
    Object.entries(apiData?.data).forEach(function (arr) {
      year.push(arr[0]);
      dataValues.push(arr[1]);
      if (typeof arr[1] === 'number') {
        dataTotal += arr[1];
      }
    });
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };

  const data = {
    labels: year,
    datasets: [
      {
        data: dataValues,
        borderColor: COLORS.primaryBlue,
        pointBackgroundColor: COLORS.primaryBlue,
        borderWidth: 1,
        backgroundColor: 'rgb(222, 232, 243)',
        fill: true,
      },
    ],
  };

  return (
    <>
      <Toolbar />
      <Paper elevation={0} key={-1} sx={{ overflow: 'hidden' }}>
        <Box sx={{ p: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {variant[0].toUpperCase() + variant.slice(1)}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: COLORS.gray, mb: 1 }}>
            {descriptions[variant]}
          </Typography>
          {dataTotal && (
            <>
              <Typography
                variant="subtitle2"
                sx={{ color: COLORS.primaryBlue }}
                align="center"
              >
                Cumulative:
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: COLORS.primaryBlue }}
                align="center"
              >
                ${dataTotal.toLocaleString()}
              </Typography>
            </>
          )}
        </Box>
        <Box sx={{ p: 1 }}>
          <Line options={options} data={data} />
        </Box>
      </Paper>
    </>
  );
}
