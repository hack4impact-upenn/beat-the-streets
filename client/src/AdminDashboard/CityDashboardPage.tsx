import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Button } from '@mui/material';
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

function CityDashboardPage() {
  const [cityList, setCityList] = useState<ICity[]>([]);
  const [rows, setRows] = useState<string[]>([]);

  useLayoutEffect(() => {
    document.body.style.backgroundColor = 'white';
  });

  const cityData = useData(`cities/all`);
  const navigate = useNavigate();

  useEffect(() => {
    if (cityData?.data) {
      const newRows = cityData?.data.map((city: ICity) => {
        if (city.isAccredited === true) {
          return `${city.cityName} (Accredited)`;
        }
        return city.cityName;
      });
      setCityList(cityData?.data);
      setRows(newRows);
    }
  }, [cityData]);

  const handleEdit = (city: string) => {
    navigate(`/admin-stats/${city}`);
  };

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
                      {row.split(' city')[0]}
                    </TableCell>
                    <TableCell align="right">
                      <Button variant="text" onClick={() => handleEdit(row)}>
                        <img
                          src={Edit}
                          alt="edit button"
                          width="25"
                          height="25"
                        />
                      </Button>
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
