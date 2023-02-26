import { Toolbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import 'chart.js/auto';
import { useData } from '../util/api';
import ICity from '../util/types/city';

export default function PieComponent() {
  // let maxKey: number | null = null;
  const [cityList, setCityList] = useState<ICity[]>([]);
  const [asian, setAsian] = useState(0);
  const [hispanic, setHispanic] = useState(0);
  const [black, setBlack] = useState(0);
  const [total, setTotal] = useState(0);
  const [others, setOthers] = useState(0);

  const [asianList, setAsianList] = useState(new Map());
  const [hispanicList, setHispanicList] = useState(new Map());
  const [blackList, setBlackList] = useState(new Map());
  const [totalList, setTotalList] = useState(new Map());

  const city = useData('cities/Philadelphia');

  useEffect(() => {
    setCityList(city?.data);
    setAsianList(city?.data.indicators.asian);
    setHispanicList(city?.data.indicators.hispanic_or_latino);
    setBlackList(city?.data.indicators.black_or_african_american);
    setTotalList(city?.data.indicators.population);
    setOthers(total - asian - hispanic - black);
    let maxKey = '0';
    if (asianList) {
      Object.entries(asianList).forEach(function (key, value) {
        const [key1, value1] = key;
        if (parseInt(key1, 10) >= parseInt(maxKey, 10)) {
          maxKey = key1;
          setAsian(value1);
        }
      });
    }
    if (hispanicList) {
      Object.entries(hispanicList).forEach(function (key, value) {
        const [key1, value1] = key;
        if (parseInt(key1, 10) >= parseInt(maxKey, 10)) {
          maxKey = key1;
          setHispanic(value1);
        }
      });
    }
    if (blackList) {
      Object.entries(blackList).forEach(function (key, value) {
        const [key1, value1] = key;
        if (parseInt(key1, 10) >= parseInt(maxKey, 10)) {
          maxKey = key1;
          setBlack(value1);
        }
      });
    }
    if (totalList) {
      Object.entries(totalList).forEach(function (key, value) {
        const [key1, value1] = key;
        if (parseInt(key1, 10) >= parseInt(maxKey, 10)) {
          maxKey = key1;
          setTotal(value1);
        }
      });
      console.log(parseInt(maxKey, 10));
    }
  }, [
    city,
    asian,
    black,
    hispanic,
    total,
    asianList,
    hispanicList,
    blackList,
    totalList,
  ]);

  // function getMax(obj: {}) {
  //   return Math.max.apply(null, Object.keys(obj));
  // }
  // var maxKey = null;
  // if (asianList) {
  //   console.log(asianList);
  //   // asianList.forEach(function (value, key) {
  //   //   if (maxKey === null || key > maxKey) {
  //   //     maxKey = key;
  //   //   }
  //   // });
  //   // console.log('hey');
  //   console.log(asianList.get(2022));
  // }

  // console.log(Math.max(...asianList.keys()));

  //   setAsian(asianList.get)
  // console.log(asianList.get(Math.max(...asianList.keys())));
  console.log(hispanicList);
  const data = {
    labels: [
      'Asian',
      'Latino or Hispanic',
      'Black or African American',
      'Other',
    ],
    datasets: [
      {
        label: '% of population',
        data: [asian, hispanic, black, others],
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
      <Pie data={data} />
    </>
  );
  //   return <Pie data={data} />;
}
