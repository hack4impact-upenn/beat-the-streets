/**
 * A file containing all the api calls for the admin dashboard.
 */
import { GridColDef } from '@mui/x-data-grid';
import { deleteData, putData } from '../util/api';
import ICity from '../util/types/city';
import toObject from '../util/types/map';

/**
 * Sends a request to the server to delete a user
 * @param email - the email of the user to delete
 * @returns true if successful, false otherwise
 */
async function deleteUser(email: string) {
  const res = await deleteData(`admin/${email}`);
  if (res.error) return false;
  return true;
}
/**
 * Sends a request to the server to promote a user to admin
 * @param email - the email of the user to promote
 * @returns true if successful, false otherwise
 */
async function upgradePrivilege(email: string) {
  const res = await putData('admin/promote', { email });
  if (res.error) return false;
  return true;
}

const accreditedColumns: GridColDef[] = [
  {
    field: 'year',
    type: 'number',
    headerName: 'Year',
    width: undefined,
    hideable: false,
    valueFormatter: (params) => params.value.toString(),
  },
  {
    field: 'assets',
    type: 'number',
    headerName: 'BTS Chapter Assets',
    width: undefined,
    hideable: false,
    editable: true,
  },
  {
    field: 'expenses',
    type: 'number',
    headerName: 'BTS Chapter Expenses',
    width: undefined,
    hideable: false,
    editable: true,
  },
  {
    field: 'revenue',
    type: 'number',
    headerName: 'BTS Chapter Revenue',
    width: undefined,
    hideable: false,
    editable: true,
  },
  {
    field: 'female_coaches',
    type: 'number',
    headerName: 'BTS Chapter Number of Female Coaches',
    width: undefined,
    hideable: false,
    editable: true,
  },
  {
    field: 'male_coaches',
    type: 'number',
    headerName: 'BTS Chapter Number of Male Coaches',
    width: undefined,
    hideable: false,
    editable: true,
  },
  {
    field: 'female_participants',
    type: 'number',
    headerName: 'BTS Chapter Number of Female Participants',
    width: undefined,
    hideable: true,
    editable: true,
  },
  {
    field: 'male_participants',
    type: 'number',
    headerName: 'BTS Chapter Number of Male Participants',
    width: undefined,
    hideable: true,
    editable: true,
  },
  {
    field: 'population',
    type: 'number',
    headerName: 'City Population',
    width: undefined,
    hideable: true,
  },
  {
    field: 'under18s',
    type: 'number',
    headerName: 'Under 18 Yrs',
    width: undefined,
    hideable: true,
  },
  {
    field: 'bachelor',
    type: 'number',
    headerName: 'Under 25 with a Bachelors Degree',
    width: undefined,
    hideable: true,
  },
  {
    field: 'persons_in_poverty',
    type: 'number',
    headerName: 'Under the Poverty Line',
    width: undefined,
    hideable: true,
  },
  {
    field: 'black_or_african_american',
    type: 'number',
    headerName: 'Identifying of Black or African American Race/Ethnicity',
    width: undefined,
    hideable: true,
  },
  {
    field: 'hispanic_or_latino',
    type: 'number',
    headerName: 'Identifying of Hispanic or Latino Race/Ethnicity',
    width: undefined,
    hideable: true,
  },
  {
    field: 'white',
    type: 'number',
    headerName: 'Identifying of White or Caucasian Race/Ethnicity',
    width: undefined,
    hideable: true,
  },
  {
    field: 'american_indian_alaskan_native',
    type: 'number',
    headerName:
      'Identifying of American or Alaskan Indian/Native Race/Ethnicity',
    width: undefined,
    hideable: true,
  },
  {
    field: 'asian',
    type: 'number',
    headerName: 'Identifying of Asian Race/Ethnicity',
    width: undefined,
    hideable: true,
  },
  {
    field: 'native_hawaiian_pacific_islander',
    type: 'number',
    headerName:
      'Identifying of Native Hawaiian or Pacific Islander Race/Ethnicity',
    width: undefined,
    hideable: true,
  },
  {
    field: 'two_or_more',
    type: 'number',
    headerName: 'Identifying of Two or More Races/Ethnicities',
    width: undefined,
    hideable: true,
  },
  {
    field: 'high_school_graduates',
    type: 'number',
    headerName: 'Graduated from High School',
    hideable: true,
  },
];

accreditedColumns.forEach((column) => {
  if (column.headerName) {
    const headerNameLength = column.headerName.length;
    // eslint-disable-next-line no-param-reassign
    column.width = Math.max(100, Math.min(200, headerNameLength * 10 + 20)); // Adjust the factor and offset as needed
  }
});

// function convertToDataGridRows(city: ICity): any[] {
//   const rows: any[] = [];

//   // Check that city.indicators is defined
//   if (city.indicators) {
//     // Convert city.indicators to an array of key-value pairs and iterate over it
//     Object.entries(city.indicators).forEach(([key, value]) => {
//       const row: any = { year: key };

//       // Convert value to an array of key-value pairs and iterate over it
//       Object.entries(value as Record<string, number>).forEach(
//         ([indicatorKey, indicatorValue]) => {
//           row[indicatorKey] = indicatorValue;
//         },
//       );

//       rows.push(row);
//     });
//   }

//   console.log('Rows');
//   console.log(rows);

//   return rows;
// }

function convertToDataGridRows(city: ICity): any[] {
  const rows: any[] = [];

  // Check that city.data.indicators is defined
  console.log('Convert to Data Grid Rows');
  console.log(city);
  if (city && city.indicators) {
    console.log('Indicators');
    console.log(city.indicators);

    // Create a mapping of years to their respective indicators
    const yearIndicatorMap: { [year: string]: any } = {};
    Object.entries(city.indicators).forEach(([indicatorKey, value]) => {
      // Convert value to an array of key-value pairs and iterate over it
      Object.entries(value as Record<string, number>).forEach(
        ([year, indicatorValue]) => {
          if (!yearIndicatorMap[year]) {
            yearIndicatorMap[year] = { year: Number(year) };
          }
          yearIndicatorMap[year][indicatorKey] = indicatorValue;
        },
      );
    });

    // Convert the mapping to an array of objects
    rows.push(...Object.values(yearIndicatorMap));
    rows.sort((a, b) => b.year - a.year);
  } else {
    console.log('No indicators');
  }

  return rows;
}

function rowsToCity(city: ICity, rows: any[]): object {
  // Initialize the indicators map
  const indicators = new Map<string, Map<string, number>>();

  // Iterate over the rows
  rows.forEach((row) => {
    // Iterate over the keys in each row
    Object.entries(row).forEach(([key, value]) => {
      // Ignore the 'year' key, as it's not an indicator
      if (key !== 'year') {
        // If the indicator doesn't exist in the map yet, add it
        if (!indicators.has(key)) {
          indicators.set(key, new Map<string, number>());
        }

        // Get the map for this indicator
        const indicatorMap = indicators.get(key)!;

        // Check if value is a number before assigning
        if (typeof value === 'number') {
          // Add the year and value to the indicator map
          indicatorMap.set(String(row.year), value);
        }
      }
    });
  });

  // Return a new city object with the calculated indicators
  const updatedCity: object = {
    ...city,
    indicators: toObject(indicators),
  };

  return updatedCity;
}

const calculateMaxYear = (rows: any[]): number => {
  let maxYear = -Infinity;
  rows.forEach((row) => {
    const { year } = row;
    if (year > maxYear) {
      maxYear = year;
    }
  });
  return maxYear;
};

export {
  deleteUser,
  upgradePrivilege,
  accreditedColumns,
  convertToDataGridRows,
  rowsToCity,
  calculateMaxYear,
};
