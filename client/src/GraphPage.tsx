import React, { useState, useLayoutEffect } from 'react';
// import { useLayoutEffect } from 'react';
import Button from '@mui/material/Button';
import Masonry from '@mui/lab/Masonry';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { LoadingButton } from '@mui/lab';

import { ReactGrid, Column, Row } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";


import { max } from 'mathjs';

import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Typography, Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from './util/redux/hooks';
import {
  // logout as logoutAction,
  // toggleAdmin,
  selectUser,
} from './util/redux/userSlice';
// import { logout as logoutApi, selfUpgrade } from './Home/api';
import ScreenGrid from './components/ScreenGrid';
// import PrimaryButton from './components/buttons/PrimaryButton';

// interface PromoteButtonProps {
//   admin: boolean | null;
//   handleSelfPromote: () => void;
//   navigator: NavigateFunction;
// }

const heights = [150, 80, 90, 70, 110, 150, 130, 200, 60, 90, 150, 80, 90, 200, 110, 150, 130, 80, 60, 90];
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  padding: theme.spacing(0.5),
  textAlign: 'center',
  color: 'black',
}));

function scroll() {
  const handleClickScroll = () => {
    const element = document.getElementById('section-1');
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
}



/**
 * The Graph Page of the user dashboard.
 * Displays all the graphs.
 */
function GraphPage() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigator = useNavigate();
  // const [admin, setAdmin] = useState(user.admin);
  // const logoutDispatch = () => dispatch(logoutAction());
  // const handleLogout = async () => {
  //   if (await logoutApi()) {
  //     logoutDispatch();
  //     navigator('/login', { replace: true });
  //   }
  // };

  // const handleSelfPromote = async () => {
  //   const newAdminStatus = await selfUpgrade(user.email as string);
  //   if (newAdminStatus) {
  //     dispatch(toggleAdmin());
  //     setAdmin(true);
  //   }
  // };

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
        {/* <GridComponent ></GridComponent> https://ej2.syncfusion.com/react/documentation/grid/scrolling/ */}
        
        {/* // <ReactGrid rows={heights} columns={heights} stickyLeftColumns = {1}> */}

        {/* </ReactGrid> */}
        <Paper sx={{ position: 'fixed', width: 300, top: 42, left: 20, right: 0 }} elevation={3}>
        {/* <Box
          sx={{
            margin: 10,//'auto',
            display: 'flex',
            justifyContent: 'space-evenly',
            // justifyContent: 'flex-start',
            alignItems: 'space-evenly',//'flex-start',
            // width: '20%',
            width: '100%', //max(250, 20%),
            height: '100%',
          }}
        > */}
          <Masonry defaultHeight={200}
                  // defaultColumns={4}
                  // defaultSpacing={1}
                  columns={1} spacing={3}>
            <Item>
            <text>
              <strong>Philadelphia</strong>
                <br />
                add graph here.
              </text>
            </Item>
            
          </Masonry>
        {/* </Box> */}

        </Paper>
          

        <Paper sx={{ position: 'flexible', marginLeft: 45, width: '75%', marginTop: 20, left: 200, right: 200}} elevation={3}>                  
          {/* <Box
            sx={{
              margin: 'auto',
              display: 'flex',
              // justifyContent: 'space-evenly',
              justifyContent: 'flex-end',
              width: '75%',
              // width: 750,
            }}
          > */}
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

export default GraphPage;
