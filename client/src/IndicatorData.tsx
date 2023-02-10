import React, { useState, useLayoutEffect } from 'react';
// import { useLayoutEffect } from 'react';
import Masonry from '@mui/lab/Masonry';
// import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


// import {ICity, City} from '../server/src/models/city.model.ts';
// above import isnt working rn so just hardcoding:
import mongoose from 'mongoose';

const CitySchema = new mongoose.Schema({
  cityName: {
    type: String,
    required: true,
  },
  isAccredited: {
    type: Boolean,
    required: true,
  },
  countiesCovered: {
    type: [String],
    required: true,
  },
  indicators: {
    type: Map,
    of: {
      type: Map,
      of: Number,
    },
    required: true,
  },
});

interface ICity extends mongoose.Document {
  _id: string;
  cityName: string;
  isAccredited: boolean;
  countiesCovered: [string];
  indicators: Map<string, Map<string, number>>;
}

const City = mongoose.model<ICity>('City', CitySchema);

// get data from some route
// fake data for now:



import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Typography, Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from './util/redux/hooks';
import {
  // logout as logoutAction,
  // toggleAdmin,
  selectUser,
} from './util/redux/userSlice';
import ScreenGrid from './components/ScreenGrid';

const heights = [150, 80, 90, 70, 110, 150, 130, 200, 60, 90, 150, 80, 90, 200, 110, 150, 130, 80, 60, 90];
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  padding: theme.spacing(0.5),
  textAlign: 'center',
  color: 'black',
}));


/**
 * The Graph Page of the user dashboard.
 * Displays all the graphs.
 */
function IndicatorData() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigator = useNavigate();

  useLayoutEffect(() => {
    document.body.style.backgroundColor = 'lightgray';
  });



  // const message = `Welcome to the Graphs page, ${user.firstName} ${user.lastName}!`;
  return (
    <ScreenGrid>
      {/* <Typography variant="h2">{message}</Typography> */}
      {/* <strong>Graph Boxes with React MUI Masonry API</strong> */}
      {/* <Grid item container justifyContent="center"> */}
      <Grid item container>
        <Paper sx={{ position: 'flexible', marginLeft: 45, width: '75%', marginTop: 20, left: 200, right: 200}} elevation={3}>                  
          <Masonry columns={3} spacing={3}>
            {heights.map((height, ind) => (
              <Item key={ind} sx={{ height }}>
                <text>
                <br />
                add graph here: #{ind + 1}
                <br />
                </text>
              </Item>
            ))}
          </Masonry>
        {/* </Box> */}
        </Paper>
      </Grid>
    </ScreenGrid>
  );
}

export default IndicatorData;
