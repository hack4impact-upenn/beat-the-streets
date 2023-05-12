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
      stacked: true,
      max: numCoaches,
      display: true,
    },
    y: {
      stacked: true,
      display: false,
    },
  },
});

export const createChartData = (
  maleData: {
    [key: number | string]: number;
  },
  femaleData: {
    [key: number | string]: number;
  },
) => ({
  labels: Object.keys(femaleData),
  datasets: [
    {
      label: 'Male',
      data: Object.values(maleData),
      backgroundColor: COLORS.primaryBlue,
      fill: true,
    },
    {
      label: 'Female',
      data: Object.values(femaleData),
      backgroundColor: 'rgb(121, 174, 234)',
      fill: true,
    },
  ],
});

type yearlyType = {
  [key: number | string]: number;
} | null;

function ParticipantsWidget({ data }: DefaultWidgetProps) {
  const cityData = data;
  const malePartYearly: yearlyType =
    cityData?.data.indicators.male_participants;
  const femalePartYearly: yearlyType =
    cityData?.data.indicators.female_participants;
  let malePart: number | null = null;
  let femalePart: number | null = null;
  let total: number | null = null;

  let firstYear: number | null = null;
  let lastYear: number | null = null;
  let range = 0;

  let maleData: {
    [key: number | string]: number;
  } | null = null;
  let femaleData: {
    [key: number | string]: number;
  } | null = null;
  let chartData = null;

  maleData = cityData?.data.indicators.male_participants;
  femaleData = cityData?.data.indicators.female_participants;

  if (maleData && femaleData) {
    chartData = createChartData(maleData, femaleData);
  }

  if (malePartYearly) {
    firstYear = Number(Object.keys(malePartYearly)[0]);
    lastYear = Number(
      Object.keys(malePartYearly)[Object.keys(malePartYearly).length - 1],
    );
    range = lastYear - firstYear;
  }

  if (malePartYearly && femalePartYearly) {
    malePart =
      Object.values(malePartYearly)[Object.values(malePartYearly).length - 1];
    femalePart =
      Object.values(femalePartYearly)[
        Object.values(femalePartYearly).length - 1
      ];
    total = malePart + femalePart;
  }

  return (
    <Paper elevation={0} key={-1} sx={{ p: 3, borderRadius: '16px' }}>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Participants
      </Typography>
      <Typography variant="subtitle2" sx={{ color: COLORS.gray, mb: 1 }}>
        Breakdown of participants
      </Typography>
      <Box sx={{ p: 3 }}>
        {chartData && <Bar options={options(range)} data={chartData} />}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          // justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography
            variant="subtitle1"
            sx={{ color: 'rgb(121, 174, 234)' }}
            fontWeight="bold"
          >
            Female
          </Typography>
          <Typography variant="body2">{femalePart}</Typography>
        </Box>
        <Box>
          <Typography
            variant="subtitle1"
            sx={{ paddingLeft: 5, color: COLORS.primaryBlue }}
            fontWeight="bold"
          >
            Male
          </Typography>
          <Typography variant="body2" sx={{ paddingLeft: 5 }}>
            {malePart}
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={{ paddingTop: 2 }}>
          Total Participants
        </Typography>
        <Typography variant="h6" sx={{ color: COLORS.primaryBlue }}>
          {total}
        </Typography>
      </Box>
    </Paper>
  );
}

export default ParticipantsWidget;
