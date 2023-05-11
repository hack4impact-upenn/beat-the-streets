import React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import COLORS from '../../assets/colors';
import { useData } from '../../util/api';

type RevenueWidgetProps = {
  data1: any;
  variant: 'revenue' | 'expenses' | 'assets';
};

const descriptions = {
  revenue: 'Recently closed fiscal year revenue',
  expenses: 'Recently closed fiscal year assets',
  assets: 'End of year net assets',
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
);

export const options = {
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
      display: true,
    },
    y: {
      display: false,
    },
  },
};

export const createChartData = (
  apiData: {
    [key: number | string]: number;
  },
  label: string,
) => ({
  labels: Object.keys(apiData),
  datasets: [
    {
      label,
      data: Object.values(apiData),
      borderColor: COLORS.primaryBlue,
      pointBackgroundColor: COLORS.primaryBlue,
      borderWidth: 1,
      backgroundColor: 'rgb(222, 232, 243)',
      fill: true,
    },
  ],
});

function RevenueWidget({ data1, variant }: RevenueWidgetProps) {
  const cityData = data1;
  let apiData: {
    [key: number | string]: number;
  } | null = null;
  let chartData = null;
  let displayValue: number | null = null;

  if (variant === 'revenue') {
    apiData = cityData?.data.indicators.revenue;
  } else if (variant === 'expenses') {
    apiData = cityData?.data.indicators.expenses;
  } else if (variant === 'assets') {
    apiData = cityData?.data.indicators.assets;
  }

  if (apiData) {
    chartData = createChartData(apiData, variant);
    displayValue = Object.values(apiData)[Object.values(apiData).length - 1];
  }

  return (
    <Paper elevation={0} key={-1} sx={{ overflow: 'hidden' }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {variant[0].toUpperCase() + variant.slice(1)}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: COLORS.gray, mb: 1 }}>
          {descriptions[variant]}
        </Typography>
        {displayValue && (
          <Typography
            variant="h4"
            sx={{ color: COLORS.primaryBlue }}
            align="center"
          >
            ${displayValue.toLocaleString('en-US')}
          </Typography>
        )}
      </Box>

      <Box sx={{ p: 3 }}>
        {chartData && <Line options={options} data={chartData} />}
      </Box>
    </Paper>
  );
}

export default RevenueWidget;
