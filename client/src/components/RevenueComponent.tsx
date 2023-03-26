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
  const year: string[] = [];

  const data2: unknown[] = [];

  console.log('revenue');
  console.log(revenue?.data);

  // useEffect(() => {
  //   setCityList(revenue?.data);
  //   if (cityList) {
  //     Object.entries(cityList).forEach(function (arr) {
  //       setYearList([...yearList, arr[0]]);
  //       setDataList([...dataList, arr[1]]);
  //     });
  //   }
  // }, [cityList, dataList, revenue?.data, yearList]);

  // console.log(yearList);
  // console.log(dataList);
  // console.log(cityList);

  if (revenue?.data) {
    Object.entries(revenue?.data).forEach(function (arr) {
      // setYearList([...yearList, arr[0]]);
      // setDataList([...dataList, arr[1]]);
      year.push(arr[0]);
      data2.push(arr[1]);
    });
  }

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
    labels: year,
    datasets: [
      {
        label: 'wer',
        data: data2,
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
