import React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import COLORS from '../../assets/colors';
import { useData } from '../../util/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const options = (numCoaches: number) => ({
  responsive: true,
  indexAxis: 'y' as const,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      display: false,
      stacked: true,
      max: numCoaches,
    },
    y: {
      display: false,
      stacked: true,
    },
  },
});

export const createChartData = (
  totalNonAccreditedCities: number,
  totalAccreditedCities: number,
) => ({
  labels: ['Count'],
  datasets: [
    {
      label: 'Current',
      data: [totalAccreditedCities],
      backgroundColor: COLORS.primaryBlue,
      // barThickness: 30,
    },
    {
      label: 'Goal',
      data: [totalNonAccreditedCities],
      backgroundColor: COLORS.lightGray,
      // barThickness: 30,
    },
  ],
});

type yearlyType = {
  [key: number | string]: number;
} | null;

type DefaultWidgetProps = {
  cities1: any;
};

function ActiveCitiesWidget({ cities1 }: DefaultWidgetProps) {
  const cityData = cities1;
  let totalAccreditedCities = 0;
  let totalCities = 0;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < cityData?.data.length; i++) {
    totalCities += 1;
    if (
      cityData?.data[i].isAccredited &&
      cityData?.data[i].isAccredited !== null
    ) {
      totalAccreditedCities += 1;
    }
  }
  const totalNonAccreditedCities = totalCities - totalAccreditedCities;

  let chartData = null;
  if (totalNonAccreditedCities && totalAccreditedCities) {
    chartData = createChartData(
      totalNonAccreditedCities,
      totalAccreditedCities,
    );
  }

  return (
    <Paper elevation={1} key={-1} sx={{ p: 3, borderRadius: '16px' }}>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Cities
      </Typography>
      <Typography variant="subtitle2" sx={{ color: COLORS.gray, mb: 1 }}>
        Current Cities with Active Programs
      </Typography>
      {chartData && totalAccreditedCities && totalNonAccreditedCities && (
        <Bar
          height="70%"
          options={options(totalAccreditedCities + totalNonAccreditedCities)}
          data={chartData}
        />
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography variant="subtitle2">Current</Typography>
          <Typography variant="body2">{totalAccreditedCities}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" align="right">
            Goal
          </Typography>
          <Typography variant="body2" align="right">
            {totalNonAccreditedCities}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

export default ActiveCitiesWidget;
