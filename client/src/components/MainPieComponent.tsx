import { Box, Paper, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import 'chart.js/auto';
import { useData } from '../util/api';
import ICity from '../util/types/city';
import COLORS from '../assets/colors';

export default function MainPieComponent() {
  //   const [asian, setAsian] = useState(0);
  //   const [hispanic, setHispanic] = useState(0);
  //   const [black, setBlack] = useState(0);
  //   const [white, setWhite] = useState(0);
  //   const [native, setNative] = useState(0);
  //   const [hawaiian, setHawaiian] = useState(0);
  //   const [twoOrMore, setTwoOrMore] = useState(0);

  //   const [asianPercent, setAsianPercent] = useState(0);
  //   const [hispanicPercent, setHispanicPercent] = useState(0);
  //   const [blackPercent, setBlackPercent] = useState(0);
  //   const [whitePercent, setWhitePercent] = useState(0);
  //   const [nativePercent, setNativePercent] = useState(0);
  //   const [hawaiianPercent, setHawaiianPercent] = useState(0);
  //   const [twoOrMorePercent, setTwoOrMorePercent] = useState(0);

  //   const asianGet = useData('cities/indicator/asian');
  //   const hispanicGet = useData('cities/indicator/hispanic_or_latino');
  //   const blackGet = useData('cities/indicator/black_or_african_american');
  //   const whiteGet = useData('cities/indicator/white');
  //   const nativeGet = useData('cities/indicator/american_indian_alaskan_native');
  //   const hawaiianGet = useData(
  //     'cities/indicator/native_hawaiian_pacific_islander',
  //   );
  //   const twoOrMoreGet = useData('cities/indicator/two_or_more');

  //   useEffect(() => {
  //     setAsian(
  //       asianGet?.data?.reduce(
  //         (accumulator: any, currentValue: any) => accumulator + currentValue,
  //         0,
  //       ) || 0,
  //     );
  //     setHispanic(
  //       hispanicGet?.data?.reduce(
  //         (accumulator: any, currentValue: any) => accumulator + currentValue,
  //         0,
  //       ) || 0,
  //     );
  //     setBlack(
  //       blackGet?.data?.reduce(
  //         (accumulator: any, currentValue: any) => accumulator + currentValue,
  //         0,
  //       ) || 0,
  //     );
  //     setWhite(
  //       whiteGet?.data?.reduce(
  //         (accumulator: any, currentValue: any) => accumulator + currentValue,
  //         0,
  //       ) || 0,
  //     );
  //     setNative(
  //       nativeGet?.data?.reduce(
  //         (accumulator: any, currentValue: any) => accumulator + currentValue,
  //         0,
  //       ) || 0,
  //     );
  //     setHawaiian(
  //       hawaiianGet?.data?.reduce(
  //         (accumulator: any, currentValue: any) => accumulator + currentValue,
  //         0,
  //       ) || 0,
  //     );
  //     setTwoOrMore(
  //       twoOrMoreGet?.data?.reduce(
  //         (accumulator: any, currentValue: any) => accumulator + currentValue,
  //         0,
  //       ) || 0,
  //     );
  //   }, [
  //     twoOrMoreGet,
  //     hawaiianGet,
  //     nativeGet,
  //     whiteGet,
  //     blackGet,
  //     hispanicGet,
  //     asianGet,
  //   ]);

  let asianTotal = 0;
  const asianMain = useData('cities/indicator/asian');
  if (asianMain) {
    asianTotal =
      asianMain?.data?.reduce(
        (accumulator: any, currentValue: any) => accumulator + currentValue,
        0,
      ) || 0;
  }
  //   console.log(`asian: ${asianTotal}`);

  let hispanicTotal = 0;
  const hispanicMain = useData('cities/indicator/hispanic_or_latino');
  if (hispanicMain) {
    hispanicTotal =
      hispanicMain?.data?.reduce(
        (accumulator: any, currentValue: any) => accumulator + currentValue,
        0,
      ) || 0;
  }
  let blackTotal = 0;
  const blackMain = useData('cities/indicator/black_or_african_american');
  if (blackMain) {
    blackTotal =
      blackMain?.data?.reduce(
        (accumulator: any, currentValue: any) => accumulator + currentValue,
        0,
      ) || 0;
  }
  let whiteTotal = 0;
  const whiteMain = useData('cities/indicator/white');
  if (whiteMain) {
    whiteTotal =
      whiteMain?.data?.reduce(
        (accumulator: any, currentValue: any) => accumulator + currentValue,
        0,
      ) || 0;
  }
  let nativeTotal = 0;
  const nativeMain = useData('cities/indicator/american_indian_alaskan_native');
  if (nativeMain) {
    nativeTotal =
      nativeMain?.data?.reduce(
        (accumulator: any, currentValue: any) => accumulator + currentValue,
        0,
      ) || 0;
  }
  let hawaiianTotal = 0;
  const hawaiiamMain = useData(
    'cities/indicator/native_hawaiian_pacific_islander',
  );
  if (hawaiiamMain) {
    hawaiianTotal =
      hawaiiamMain?.data?.reduce(
        (accumulator: any, currentValue: any) => accumulator + currentValue,
        0,
      ) || 0;
  }
  let twoTotal = 0;
  const twoMain = useData('cities/indicator/two_or_more');
  if (twoMain) {
    twoTotal =
      twoMain?.data?.reduce(
        (accumulator: any, currentValue: any) => accumulator + currentValue,
        0,
      ) || 0;
  }

  const sum = asianTotal + hispanicTotal + blackTotal;
  const asianPercent = (asianTotal * 100) / sum;
  const hispanicPercent = (hispanicTotal * 100) / sum;
  const blackPercent = (blackTotal * 100) / sum;
  const whitePercent = (whiteTotal * 100) / sum;
  const nativePercent = (nativeTotal * 100) / sum;
  const hawaiianPercent = (hawaiianTotal * 100) / sum;
  const twoPercent = (twoTotal * 100) / sum;

  //   console.log(`asian: ${asianTotal}`);

  //   if (asianMain && asianMain.data) {
  //     asianMain.data.forEach((element: any, index: any) => {
  //       console.log(`Element at index ${index}:`, element);
  //     });
  //   } else {
  //     console.log('Unable to retrieve asianMain data.');
  //   }
  //   const asianMain = useData('/indicatoryearly/asian');

  //   const sum = asian + hispanic + black + white + native + hawaiian + twoOrMore;
  //   setAsianPercent((asian * 100) / sum);
  //   setHispanicPercent((hispanic * 100) / sum);
  //   setBlackPercent((black * 100) / sum);
  //   setWhitePercent((white * 100) / sum);
  //   setNativePercent((native * 100) / sum);
  //   setHawaiianPercent((hawaiian * 100) / sum);
  //   setTwoOrMorePercent((twoOrMore * 100) / sum);

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
    <Paper elevation={0} key={-1} sx={{ overflow: 'hidden' }}>
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
