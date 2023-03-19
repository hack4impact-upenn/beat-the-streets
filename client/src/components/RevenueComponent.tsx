import { Toolbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import 'chart.js/auto';
import { useData } from '../util/api';
import ICity from '../util/types/city';

export default function RevenueComponent() {
  // let maxKey: number | null = null;
  const [cityList, setCityList] = useState(new Map());

  const [yearList, setYearList] = useState<string[]>([]);
  const [dataList, setDataList] = useState<number[]>([]);

  // // const city = useData('cities/Philadelphia');
  const revenue = useData('cities/indicatoryearly/revenue');

  console.log('revenue');
  console.log(revenue?.data);

  useEffect(() => {
    setCityList(revenue?.data);
    console.log(cityList);
    if (cityList) {
      Object.entries(cityList).forEach(function (arr) {
        setYearList([...yearList, arr[0]]);
        setDataList([...dataList, arr[1]]);
        // console.log('wer');
        // console.log(arr);
      });
    }
  }, [cityList, revenue, yearList, dataList]);

  console.log(yearList);
  console.log(dataList);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

  const data = {
    labels: [
      'Asian',
      'Latino or Hispanic',
      'Black or African American',
      'Other',
    ],
    datasets: [
      {
        label: 'wer',
        data: dataList,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Toolbar />
      <Line options={options} data={data} />
    </>
  );
}
