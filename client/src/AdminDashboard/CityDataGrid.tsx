import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridRowSelectionModel } from '@mui/x-data-grid';
import {
  Button,
  FormControlLabel,
  FormGroup,
  Switch,
  Toolbar,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { Add, Check, Delete } from '@mui/icons-material';
import { putData, useData } from '../util/api';
import ICity from '../util/types/city';
import {
  convertToDataGridRows,
  accreditedColumns,
  rowsToCity,
  calculateMaxYear,
} from './api';
import useAlert from '../util/hooks/useAlert';
import AlertType from '../util/types/alert';

function CityDataGrid() {
  const { cityName } = useParams();
  const [rows, setRows] = React.useState<any[]>([]); // Keep the rows in a state
  const [isAccredited, setIsAccredited] = React.useState<boolean>(false);
  const [originalIsAccredited, setOriginalIsAccredited] =
    React.useState<boolean>(false);
  const [originalRows, setOriginalRows] = React.useState<any[]>([]);
  const [selectedRows, setSelectedRows] = React.useState<any[]>([]);
  const cityData = useData(`cities/${cityName}`);

  React.useEffect(() => {
    if (cityData) {
      const dataGridRows = convertToDataGridRows(
        cityData.data as unknown as ICity,
      );
      setRows(dataGridRows);
      setOriginalRows(dataGridRows);

      console.log(cityData.data.isAccredited);
      setIsAccredited(cityData.data.isAccredited);
      setOriginalIsAccredited(cityData.data.isAccredited);
    }
  }, [cityData]);

  const { setAlert } = useAlert();

  const updateCityData = async (city: ICity) => {
    const updatedCity = rowsToCity(city, rows) as ICity;
    updatedCity.isAccredited = isAccredited;
    console.log('passing data should be new: ', updatedCity);
    console.log('Updating City');
    await putData(`cities/${cityName}`, {
      city: updatedCity,
    }).then((res) => {
      if (res.error) {
        setAlert(`Error saving changes`, AlertType.ERROR);
      } else {
        setAlert(`Successfully saved changes`, AlertType.SUCCESS);
        setOriginalIsAccredited(isAccredited);
        setOriginalRows(rows);
      }
    });
  };

  const handleProcessRowUpdate = async (newRow: any, oldRow: any) => {
    const updatedRows = rows.map((row) => {
      if (row.year === oldRow.year) {
        return { ...row, ...newRow };
      }

      return row;
    });

    setRows(updatedRows);
    return newRow;
  };

  const handleDeleteSelectedRows = () => {
    console.log('selectedRows: ', selectedRows);
    const updatedRows = rows.filter((row) => !selectedRows.includes(row.year));
    setRows(updatedRows);
    setSelectedRows([]); // Clear the selected rows after deletion
  };

  const handleProcessRowUpdateError = React.useCallback((error: Error) => {
    console.log(error);
  }, []);

  const addNewYear = () => {
    const newYear = {
      year: calculateMaxYear(rows) + 1,
    };

    setRows([...rows, newYear]);
  };

  const isSaveDisabled =
    JSON.stringify(rows) === JSON.stringify(originalRows) &&
    isAccredited === originalIsAccredited;

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        width: { sm: '100%' },
      }}
      p={4}
    >
      <Toolbar />

      <Box flexDirection="row" display="flex" width="100%" pb={2}>
        <Typography variant="h3">{cityData?.data.cityName}</Typography>
        <Button
          component="button"
          onClick={() => updateCityData(cityData?.data as unknown as ICity)}
          variant="contained"
          color="primary"
          size="large"
          startIcon={<Check />}
          sx={{ ml: 'auto', alignSelf: 'center' }}
          disabled={isSaveDisabled}
        >
          Save Changes
        </Button>
      </Box>

      <FormGroup>
        <FormControlLabel
          control={<Switch checked={isAccredited} />}
          label="Is this chapter accredited?"
          onChange={(e: any) => {
            setIsAccredited(e.target.checked);
          }}
        />
      </FormGroup>

      {isAccredited && (
        <div>
          <Typography pt={2}>
            Modify the BTS data for this city by editing the cells in the table
            below
          </Typography>

          <Box flexDirection="row" display="flex" width="100%" py={4}>
            <Button
              component="button"
              onClick={addNewYear}
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<Add />}
              sx={{ mr: 4 }}
            >
              Add New Year
            </Button>
            <Button
              component="button"
              variant="outlined"
              color="error"
              size="small"
              disabled={selectedRows.length === 0}
              startIcon={<Delete />}
              onClick={handleDeleteSelectedRows}
            >
              Delete Selected Year(s)
            </Button>
          </Box>

          <Box sx={{ height: '100%', width: '100%', minHeight: 200 }}>
            <DataGrid
              rows={rows}
              columns={accreditedColumns}
              getRowId={(row) => row.year}
              processRowUpdate={handleProcessRowUpdate}
              onProcessRowUpdateError={handleProcessRowUpdateError}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[5, 10, 20]}
              checkboxSelection
              disableRowSelectionOnClick
              onRowSelectionModelChange={(
                newSelectionModel: GridRowSelectionModel,
              ) => setSelectedRows(newSelectionModel)}
            />
          </Box>
        </div>
      )}

      {!isAccredited && (
        <Typography pt={2}>
          This chapter is not accredited. Toggle this to edit the BTS data for
          this chapter.
        </Typography>
      )}
    </Box>
  );
}

export default CityDataGrid;
