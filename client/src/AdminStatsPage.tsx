/* eslint-disable react/no-array-index-key */
import React, { useLayoutEffect, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { Typography, Grid, Toolbar, Button } from '@mui/material';
import { useData } from './util/api';
import ICity from './util/types/city';
import { PaginationTable, TColumn, TRow } from './components/PaginationTable';

interface AdminStatsPageProps {
  cityName: string;
}

function AdminStatsPage({ cityName }: AdminStatsPageProps) {
  useLayoutEffect(() => {
    document.body.style.backgroundColor = 'lightgray';
  });

  const [city, setCity] = useState<ICity>();
  const cityData = useData(`cities/${cityName}`);

  const [indicatorDicts, setIndicatorDicts] = useState<Map<string, number>[]>([]);

  const updateData = () => {
    // backend route here
  };

  useEffect(() => {
    console.log(cityData?.data);
    if (cityData === undefined || cityData === null) {
      return;
    }
    const cityResponse: ICity = {
      _id: cityData.data._id, // eslint-disable-line no-underscore-dangle
      cityName: cityData.data.cityName,
      countiesCovered: cityData.data.countiesCovered,
      indicators: new Map<string, Map<string, number>>(),
      isAccredited: cityData.data.isAccredited,
    };

    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (const indicatorName in cityData.data.indicators) {
      const indicatorDict = cityData.data.indicators[indicatorName];
      const indicatorMap = new Map<string, number>();
      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const year in indicatorDict) {
        indicatorMap.set(year, indicatorDict[year]);
      }
      cityResponse.indicators.set(indicatorName, indicatorMap);
    }
    setCity(cityResponse);
  }, [cityData]);

  if (city === undefined) {
    console.log('error unable to find city');
    return <br />;
    // TODO: ERROR HANDLE?
  }

  const indicators = Array.from(city.indicators.keys());
  useEffect(() => {
    setIndicatorDicts(Array.from(city.indicators.values()));
  }, []);
  

  // set to find the union of all years in the indicator dictionaries (some indicators may not have data for all years)
  const years = new Set<string>();
  Array.from(indicatorDicts).forEach(function (v) {
    Array.from(v.keys()).forEach(function (year) {
      years.add(year);
    });
  });

  // setup for pagination table
  let columns: TColumn[] = [{ id: 'indicator', label: 'Indicator' }];
  columns = columns.concat(
    Array.from(years).map((year) => ({ id: year, label: year })),
  );
  function createCityEditIndicatorRow(
    indicatorName: string,
    indicatorDict: Map<string, number>,
  ) {
    const row: TRow = { key: `${indicatorName}` };
    row.indicator = indicatorName;
    Array.from(years).forEach(function (year) {
      // create a field
      if (indicatorDict.has(year)) {
        row[year] = (
          <TextField
            id="outlined-basic"
            defaultValue={indicatorDict.get(year)!}
          />
        );
      } else {
        row[year] = <TextField id="outlined-basic" />;
      }
    });
    return row;
  }


  function addYearCol(
    year: string,
    // city: ICity,
  ) {

    years.add(year);
    const indics = Array.from(city!.indicators.values());

    Array.from(indics).forEach(function (indic) {
      // indic is a Map<string, number>
      indic.set(year, 0);
    })

    setIndicatorDicts(indics); // rerender?
  }

  console.log(indicatorDicts);

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, paddingTop: 4, paddingLeft: 4, width: { sm: '100%' } }}
    >
      <Toolbar />

      <Button
          onClick={() => addYearCol((Math.max(...Array.from(years).map(Number)) + 1).toString())} //, city)}
          sx={{ marginTop: 8, marginBottom: 8, width: { sm: '100%' } }}
        >
          Add Column
        </Button>

      <Grid container spacing={4}>
        <Typography variant="h4">{cityName}</Typography>
        <Typography>Accredited</Typography>
        <Grid container sx={{ paddingTop: 4 }}>
          <PaginationTable
            rows={Array.from(indicatorDicts).map((indicatorMap, index) =>
              createCityEditIndicatorRow(indicators[index], indicatorMap),
            )}
            columns={columns}
          />
        </Grid>
        <Button
          onClick={updateData}
          sx={{ marginTop: 8, marginBottom: 8, width: { sm: '100%' } }}
        > Save
        </Button>
      </Grid>
    </Box>
  );
}

export default AdminStatsPage;
