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
  maleMainParticipants: number,
  femaleMainParticipants: number,
) => ({
  labels: ['Count'],
  datasets: [
    {
      label: 'Female',
      data: [femaleMainParticipants],
      backgroundColor: 'rgb(121, 174, 234)',
      // barThickness: 30,
    },
    {
      label: 'Male',
      data: [maleMainParticipants],
      backgroundColor: COLORS.primaryBlue,
      // barThickness: 30,
    },
  ],
});

type yearlyType = {
  [key: number | string]: number;
} | null;

function MainParticipantsWidget() {
  const maleMainParticipants = useData('cities/indicator/male_participants');
  let maleParticipantsTotal = 0;
  if (maleMainParticipants) {
    maleParticipantsTotal =
      maleMainParticipants?.data?.reduce(
        (accumulator: any, currentValue: any) => accumulator + currentValue,
        0,
      ) || 0;
  }
  const femaleMainParticipants = useData(
    'cities/indicator/female_participants',
  );
  let femaleParticipantsTotal = 0;
  if (femaleMainParticipants) {
    femaleParticipantsTotal =
      femaleMainParticipants?.data?.reduce(
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
  if (maleParticipantsTotal && femaleParticipantsTotal) {
    chartData = createChartData(maleParticipantsTotal, femaleParticipantsTotal);
  }

  return (
    <Paper elevation={0} key={-1} sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Coaches
      </Typography>
      <Typography variant="subtitle2" sx={{ color: COLORS.gray, mb: 1 }}>
        Number of female and male coaches across accredited chapters
      </Typography>
      {chartData && maleParticipantsTotal && femaleParticipantsTotal && (
        <Bar
          height="70%"
          options={options(maleParticipantsTotal + femaleParticipantsTotal)}
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
          <Typography variant="body2">{femaleParticipantsTotal}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" align="right">
            Male
          </Typography>
          <Typography variant="body2" align="right">
            {maleParticipantsTotal}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

export default MainParticipantsWidget;
