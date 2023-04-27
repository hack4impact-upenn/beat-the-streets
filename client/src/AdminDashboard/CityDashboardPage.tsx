import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Typography, Grid } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useData } from '../util/api';
import ICity from '../util/types/city';
import Edit from '../images/editDashboard.png';

/**
 * M
 */

function createData(name: string) {
  return { name };
}

function CityDashboardPage() {
  const [cityList, setCityList] = useState<ICity[]>([]);
  const [rows, setRows] = useState<string[]>([]);

  useLayoutEffect(() => {
    document.body.style.backgroundColor = 'white';
  });
  const cityData = useData(`cities/all`);

  useEffect(() => {
    setCityList(cityData?.data);
  }, [cityData]);

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < cityList?.length; i++) {
    if (rows.length <= cityList?.length) {
      if (cityList[i].isAccredited === true) {
        rows.push(`${cityList[i].cityName} (Accredited)`);
      } else {
        rows.push(cityList[i].cityName);
      }
    }
  }

  return (
    <Grid
      container
      xs={12}
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Grid item>
        <div style={{ height: '60vh', width: '60vw' }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>City Name</TableCell>
                  <TableCell align="right">Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row}
                    </TableCell>
                    <TableCell align="right">
                      <img
                        src={Edit}
                        alt="edit button"
                        width="25"
                        height="25"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Grid>
    </Grid>
  );
}

export default CityDashboardPage;
