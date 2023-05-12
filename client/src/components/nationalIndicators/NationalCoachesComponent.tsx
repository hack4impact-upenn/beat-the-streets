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

type DefaultWidgetProps = {
  maleData1: any;
  femaleData1: any;
};

function MainCoachesWidget({ maleData1, femaleData1 }: DefaultWidgetProps) {
  const maleMainCoaches = maleData1;
  let maleCoachesTotal = 0;
  if (maleMainCoaches) {
    maleCoachesTotal =
      maleMainCoaches?.data?.reduce(
        (accumulator: any, currentValue: any) => accumulator + currentValue,
        0,
      ) || 0;
  }
  const femaleMainCoaches = femaleData1;
  let femaleCoachesTotal = 0;
  if (femaleMainCoaches) {
    femaleCoachesTotal =
      femaleMainCoaches?.data?.reduce(
        (accumulator: any, currentValue: any) => accumulator + currentValue,
        0,
      ) || 0;
  }
  //   const cityData = useData(`cities/${city}`);
  //   const maleCoachesYearly: yearlyType = cityData?.data.indicators.male_coaches;
  //   const femaleCoachesYearly: yearlyType =
  //     cityData?.data.indicators.female_coaches;
  //   let maleCoaches: number | null = null;
  //   let femaleCoaches: number | null = null;

  //   if (maleCoachesYearly && femaleCoachesYearly) {
  //     maleCoaches =
  //       Object.values(maleCoachesYearly)[
  //         Object.values(maleCoachesYearly).length - 1
  //       ];
  //     femaleCoaches =
  //       Object.values(femaleCoachesYearly)[
  //         Object.values(femaleCoachesYearly).length - 1
  //       ];
  //   }

  let chartData = null;
  if (maleCoachesTotal && femaleCoachesTotal) {
    chartData = createCoachChartData(maleCoachesTotal, femaleCoachesTotal);
  }

  return (
    <Paper elevation={1} key={-1} sx={{ p: 3, borderRadius: '16px' }}>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Coaches
      </Typography>
      <Typography variant="subtitle2" sx={{ color: COLORS.gray, mb: 1 }}>
        Number of female and male coaches across accredited chapters
      </Typography>
      {chartData && maleCoachesTotal && femaleCoachesTotal && (
        <Bar
          height="70%"
          options={options(maleCoachesTotal + femaleCoachesTotal)}
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
          <Typography variant="body2">{femaleCoachesTotal}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" align="right">
            Male
          </Typography>
          <Typography variant="body2" align="right">
            {maleCoachesTotal}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

export default MainCoachesWidget;
