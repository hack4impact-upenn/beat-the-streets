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

type DefaultWidgetProps = {
  data: any;
};

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

export const createCoachChartData = (
  maleCoaches: number,
  femaleCoaches: number,
) => ({
  labels: ['Count'],
  datasets: [
    {
      label: 'Female',
      data: [femaleCoaches],
      backgroundColor: 'rgb(121, 174, 234)',
      // barThickness: 30,
    },
    {
      label: 'Male',
      data: [maleCoaches],
      backgroundColor: COLORS.primaryBlue,
      // barThickness: 30,
    },
  ],
});

type yearlyType = {
  [key: number | string]: number;
} | null;

function CoachesWidget({ data }: DefaultWidgetProps) {
  const cityData = data;
  const maleCoachesYearly: yearlyType = cityData?.data.indicators.male_coaches;
  const femaleCoachesYearly: yearlyType =
    cityData?.data.indicators.female_coaches;
  let maleCoaches: number | null = null;
  let femaleCoaches: number | null = null;

  if (maleCoachesYearly && femaleCoachesYearly) {
    maleCoaches =
      Object.values(maleCoachesYearly)[
        Object.values(maleCoachesYearly).length - 1
      ];
    femaleCoaches =
      Object.values(femaleCoachesYearly)[
        Object.values(femaleCoachesYearly).length - 1
      ];
  }

  let chartData = null;
  if (maleCoaches && femaleCoaches) {
    chartData = createCoachChartData(maleCoaches, femaleCoaches);
  }

  return (
    <Paper elevation={0} key={-1} sx={{ p: 3, borderRadius: '16px' }}>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Coaches
      </Typography>
      <Typography variant="subtitle2" sx={{ color: COLORS.gray, mb: 1 }}>
        Number of female and male coaches
      </Typography>
      {chartData && maleCoaches && femaleCoaches && (
        <Bar
          height="70%"
          options={options(maleCoaches + femaleCoaches)}
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
          <Typography variant="subtitle2">Female</Typography>
          <Typography variant="body2">{femaleCoaches}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" align="right">
            Male
          </Typography>
          <Typography variant="body2" align="right">
            {maleCoaches}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

export default CoachesWidget;
