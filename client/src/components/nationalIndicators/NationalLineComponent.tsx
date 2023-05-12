import { Box, Paper, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import 'chart.js/auto';
import { useData } from '../../util/api';
import ICity from '../../util/types/city';
import COLORS from '../../assets/colors';

type LineComponentProps = {
  data1: any;
  variant: 'revenue' | 'expenses';
};

export default function LineComponent({ data1, variant }: LineComponentProps) {
  const descriptions = {
    revenue: 'Yearly Network Revenue',
    expenses: 'Yearly Network Expenses',
  };
  // let api = '';
  // if (variant === 'revenue') {
  //   api = 'cities/indicatoryearly/revenue';
  // } else {
  //   api = 'cities/indicatoryearly/expenses';
  // }

  const apiData = data1;
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

  if (variant === 'expenses') {
    return (
      <Paper
        elevation={0}
        key={-1}
        sx={{ overflow: 'hidden', borderRadius: '16px' }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Yearly Network Expenses
          </Typography>
          <Typography variant="subtitle2" sx={{ color: COLORS.gray, mb: 1 }}>
            Expenses
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
          <Line options={options} data={data} />
        </Box>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={0}
      key={-1}
      sx={{ overflow: 'hidden', borderRadius: '16px' }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Yearly Network Revenue
        </Typography>
        <Typography variant="subtitle2" sx={{ color: COLORS.gray, mb: 1 }}>
          Revenues
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
        <Line options={options} data={data} />
      </Box>
    </Paper>
  );
}
