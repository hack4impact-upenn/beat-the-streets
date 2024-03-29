/* eslint-disable react/no-array-index-key */
import React, { useLayoutEffect, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import {
  Typography,
  Grid,
  Toolbar,
  Button,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useData, putData } from '../util/api';
import ICity from '../util/types/city';
import { PaginationTable, TColumn, TRow } from '../components/PaginationTable';
import toObject from '../util/types/map';
import COLORS from '../assets/colors';

function AdminStatsPage() {
  const { cityName } = useParams();

  useLayoutEffect(() => {
    document.body.style.backgroundColor = COLORS.lightGray;
  });

  const [city, setCity] = useState<ICity>();
  const cityData = useData(`cities/${cityName}`); // type is City
  const [indicatorDicts, setIndicatorDicts] = useState<
    Map<string, Map<string, number>>
  >(new Map()); // useState<Map<string, number>[]>([]);
  const accredited = cityData?.data.isAccredited;
  const [checked, setChecked] = useState(false);

  // function handler for save button -- pushes updated data to backend
  const updateData = () => {
    // backend route here
    if (city === undefined) return;
    if (cityData === null) return;
    const cityDataCopy: object = {
      ...city,
      isAccredited: checked,
      indicators: toObject(new Map(indicatorDicts)),
    };
    console.log('passing data should be new: ', cityDataCopy);
    const response = putData(`cities/${cityName}`, { city: cityDataCopy });
    console.log('response: ', response);
  };

  // effect handler for city data (api response) -- updates the city object
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

  // effect handler for city object -- updates the indicatorDicts array
  useEffect(() => {
    if (city === undefined) return;
    console.log(city.indicators);
    setIndicatorDicts(city.indicators); // .values()));
  }, [city]);

  if (city === undefined) {
    // console.log('error unable to find city');
    return <br />;
    // TODO: ERROR HANDLE?
  }

  const indicators = Array.from(city.indicators.keys());
  const indicatorValues = Array.from(city.indicators.values());

  // set to find the union of all years in the indicator dictionaries (some indicators may not have data for all years)
  const years = new Set<number>();
  Array.from(indicatorValues).forEach(function (v) {
    Array.from(v.keys()).forEach(function (year) {
      years.add(parseInt(year, 10));
      // years.add(year);
      // console.log(year);
    });
  });
  // console.log(years);

  function rowLabel(indicator: string) {
    if (indicator === 'population') {
      return 'City Population';
    }
    if (indicator === 'under18s') {
      return 'Population Under 18 Years Old';
    }
    if (indicator === 'bachelor') {
      return 'Population Under 25 with a Bachelors Degree';
    }
    if (indicator === 'persons_in_poverty') {
      return 'Population Under the Poverty Line';
    }
    if (indicator === 'black_or_african_american') {
      return 'Population Identifying of Black or African American Race/Ethnicity';
    }
    if (indicator === 'hispanic_or_latino') {
      return 'Population Identifying of Hispanic or Latino Race/Ethnicity';
    }
    if (indicator === 'white') {
      return 'Population Identifying of White or Caucasian Race/Ethnicity';
    }
    if (indicator === 'american_indian_alaskan_native') {
      return 'Population Identifying of American or Alaskan Indian/Native Race/Ethnicity';
    }
    if (indicator === 'asian') {
      return 'Population Identifying of Asian Race/Ethnicity';
    }
    if (indicator === 'native_hawaiian_pacific_islander') {
      return 'Population Identifying of Native Hawaiian or Pacific Islander Race/Ethnicity';
    }
    if (indicator === 'two_or_more') {
      return 'Population Identifying of Two or More Races/Ethnicities';
    }
    if (indicator === 'high_school_graduates') {
      return 'Population that Graduated from High School';
    }
    if (indicator === 'assets') {
      return 'BTS Chapter Assets';
    }
    if (indicator === 'expenses') {
      return 'BTS Chapter Expenses';
    }
    if (indicator === 'revenue') {
      return 'BTS Chapter Revenue';
    }
    if (indicator === 'female_coaches') {
      return 'BTS Chapter Number of Female Coaches';
    }
    if (indicator === 'male_coaches') {
      return 'BTS Chapter Number of Male Coaches';
    }
    if (indicator === 'female_participants') {
      return 'BTS Chapter Number of Female Participants';
    }
    if (indicator === 'male_participants') {
      return 'BTS Chapter Number of Male Participants';
    }
    return indicator;
  }

  // setup for pagination table
  let columns: TColumn[] = [
    { id: 'indicator', label: 'Indicator', minWidth: 170 },
  ];
  const yearsList = Array.from(years);
  const yearsListSorted = yearsList.sort((a, b) => a - b);
  columns = columns.concat(
    yearsListSorted.map((year) => ({
      id: `${year}`,
      label: `${year}`,
      minWidth: 170,
    })),
  );
  function createCityEditIndicatorRow(
    indicatorName: string,
    indicatorDict: Map<string, number>,
  ) {
    const row: TRow = { key: indicatorName };
    row.indicator = rowLabel(indicatorName);
    yearsListSorted.forEach(function (year) {
      // create a field
      if (indicatorDict.has(`${year}`)) {
        row[year] = (
          <TextField
            id="outlined-basic"
            defaultValue={indicatorDict.get(`${year}`)}
            onChange={(e: any) => {
              const { value } = e.target;
              const indicatorDictsCopy: Map<
                string,
                Map<string, number>
              > = new Map(indicatorDicts);
              indicatorDictsCopy
                .get(indicatorName)
                ?.set(`${year}`, parseInt(value, 10));
              setIndicatorDicts(indicatorDictsCopy);
            }}
          />
        );
      } else {
        row[year] = (
          <TextField
            id="outlined-basic"
            onChange={(e: any) => {
              const { value } = e.target;
              const indicatorDictsCopy: Map<
                string,
                Map<string, number>
              > = new Map(indicatorDicts);
              indicatorDictsCopy
                .get(indicatorName)
                ?.set(`${year}`, parseInt(value, 10));
              setIndicatorDicts(indicatorDictsCopy);
            }}
          />
        );
      }
    });
    return row;
  }

  function addYearCol(
    year: string,
    // city: ICity,
  ) {
    years.add(parseInt(year, 10));

    const indicatorDictsCopy: Map<string, Map<string, number>> = new Map(
      indicatorDicts,
    );
    Array.from(indicatorDictsCopy).forEach(function ([k, v]) {
      // indic is a Map<string, number>
      v.set(year, 0);
    });

    setIndicatorDicts(indicatorDictsCopy);
  }

  // function deleteYearCol(
  //   year: string,
  //   // city: ICity,
  // ) {
  //   years.delete(parseInt(year, 10));

  //   const indicatorDictsCopy: Map<string, Map<string, number>> = new Map(
  //     indicatorDicts,
  //   );
  //   Array.from(indicatorDictsCopy).forEach(function ([k, v]) {
  //     // indic is a Map<string, number>
  //     v.set(year, 0);
  //   });

  //   setIndicatorDicts(indicatorDictsCopy);
  // }

  function deleteYearCol(year: string) {
    years.delete(parseInt(year, 10));

    const indicatorDictsCopy: Map<string, Map<string, number>> = new Map(
      indicatorDicts,
    );
    Array.from(indicatorDictsCopy).forEach(function ([k, v]) {
      v.delete(year);
    });

    setIndicatorDicts(indicatorDictsCopy);
  }

  // toggle handler
  const switchHandler = (event: any) => {
    setChecked(event.target.checked);
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        paddingTop: 10,
        paddingLeft: 5,
        width: { sm: '100%' },
      }}
    >
      <Toolbar />

      <Grid container spacing={4} item xs={12}>
        <Typography variant="h4">{cityName?.split(' city')[0]}</Typography>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Switch defaultChecked={accredited} />}
            label="Accredited"
            onChange={switchHandler}
          />
          {/* <Typography
            variant="subtitle1"
            sx={{ color: COLORS.gray, fontWeight: 'bold' }}
          >
            {accredited && 'Accredited'}
          </Typography> */}
        </Grid>
        <Grid container sx={{ paddingTop: 4 }}>
          <PaginationTable
            rows={Array.from(indicatorDicts).map(([key, val]) =>
              createCityEditIndicatorRow(key, val),
            )}
            columns={columns}
          />
        </Grid>
        <Grid
          justifyContent="center"
          direction="row"
          alignItems="center"
          container
        >
          {/* <Grid item xs={6} alignItems="center" justifyContent="center"> */}
          <Button
            onClick={() =>
              addYearCol(
                (Math.max(...Array.from(years).map(Number)) + 1).toString(),
              )
            } // , city)}
            sx={{
              marginTop: 8,
              marginBottom: 8,
              marginLeft: 2,
              marginRight: 2,
            }}
            variant="outlined"
          >
            Add New Year
          </Button>
          <Button
            color="error"
            onClick={() =>
              deleteYearCol(
                Math.max(...Array.from(years).map(Number)).toString(),
              )
            } // , city)}
            sx={{
              marginTop: 8,
              marginBottom: 8,
              marginLeft: 2,
              marginRight: 2,
            }}
            variant="outlined"
          >
            Remove Most Recent Year
          </Button>
          {/* </Grid>
          <Grid item xs={6} alignItems="center" justifyContent="center"> */}
          <Button
            onClick={updateData}
            sx={{
              marginTop: 8,
              marginBottom: 8,
              marginLeft: 2,
              marginRight: 2,
            }}
            variant="contained"
          >
            {' '}
            Save
          </Button>
          {/* </Grid> */}
        </Grid>
      </Grid>
    </Box>
  );
}

export default AdminStatsPage;
