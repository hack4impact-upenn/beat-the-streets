/**
 * A file that contains all the components and logic for the table of users
 * in the AdminDashboardPage.
 */
import React, { useEffect, useState } from 'react';
import { PaginationTable, TColumn, TRow } from '../components/PaginationTable';
import ICity from '../util/types/city';

interface CityRow {
  key: string;
  cityName: string;
}

function CityTable() {
  const columns: TColumn[] = [{ id: 'cityName', label: 'City Name' }];

  // this function should hypothetically create the row for a city given the city
  // I haven't tested this, I just used the dummy data
  function createCityRow(city: ICity): CityRow {
    const { _id, cityName, isAccredited, countiesCovered, indicators } = city;
    return {
      key: _id,
      cityName: cityName,
    };
  }

  // dummy data
  const cityList: TRow[] = [
    { key: 'Philadelphia', cityName: 'Philadelphia' },
    { key: 'New York', cityName: 'New York' },
    { key: 'Boston', cityName: 'Boston' },
    { key: 'San Francisco', cityName: 'San Francisco' },
  ];

  return <PaginationTable rows={cityList} columns={columns} />;
}

export default CityTable;
