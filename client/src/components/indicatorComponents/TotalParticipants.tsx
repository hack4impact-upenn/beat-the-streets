import React, { useEffect, useState } from 'react';
import { Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useData } from '../../util/api';
import ICity from '../../util/types/city';
import COLORS from '../../assets/colors';

function TotalParticipants() {
  const maleData = useData(`cities/indicator/male_participants`);
  const femaleData = useData(`cities/indicator/female_participants`);

  const maleParticipants = maleData?.data.reduce(
    (acc: number, val: number) => acc + val,
    0,
  );

  const femaleParticipants = femaleData?.data.reduce(
    (acc: number, val: number) => acc + val,
    0,
  );

  return (
    <Paper elevation={0} key={-1} sx={{ overflow: 'hidden' }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Total Participants
        </Typography>
        <Typography variant="subtitle2" sx={{ color: COLORS.gray, mb: 1 }}>
          Total number of BTS Network youth participants
        </Typography>
        {maleData !== undefined && femaleData !== undefined && (
          <Typography
            variant="h4"
            sx={{ color: COLORS.primaryBlue }}
            align="center"
          >
            <h1 style={{ fontSize: '2.125rem', color: '#0175C0' }}>
              {maleParticipants + femaleParticipants}
            </h1>
          </Typography>
        )}
      </Box>
    </Paper>
  );
}

export default TotalParticipants;
