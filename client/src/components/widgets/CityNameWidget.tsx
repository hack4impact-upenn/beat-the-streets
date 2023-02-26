import React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import COLORS from '../../assets/colors';
import { useData } from '../../util/api';
import PhiladelphiaLogo from '../../assets/images/logos/BTS.Philadelphia.jpg';

type DefaultWidgetProps = {
  city: string;
};

function CityNameWidget({ city }: DefaultWidgetProps) {
  const cityData = useData(`cities/${city}`);

  const accredited = cityData?.data.isAccredited;
  const established = 2012;
  // const established = cityData?.data.established;
  const populationList: { [key: number]: number } =
    cityData?.data.indicators.population;
  const maleParticipantsList: { [key: number]: number } =
    cityData?.data.indicators.male_participants;
  const femaleParticipantsList: { [key: number]: number } =
    cityData?.data.indicators.female_participants;

  const population =
    Object.values(populationList)[Object.values(populationList).length - 1];
  const participants =
    Object.values(maleParticipantsList)[
      Object.values(maleParticipantsList).length - 1
    ] +
    Object.values(femaleParticipantsList)[
      Object.values(femaleParticipantsList).length - 1
    ];

  return (
    <Paper elevation={1} sx={{ position: 'fixed', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mr: 1 }}>
        <Box>
          <Typography variant="h4">{city}</Typography>
          <Typography variant="subtitle2" sx={{ color: COLORS.gray, mb: 10 }}>
            {accredited && 'Accredited'}
          </Typography>
        </Box>
        <img src={PhiladelphiaLogo} alt="logo" width={64} height={64} />
      </Box>
      <Box sx={{ display: 'flex', gap: 4 }}>
        <Box>
          <Typography variant="subtitle1">Population</Typography>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {Intl.NumberFormat('en-US', {
              notation: 'compact',
              maximumFractionDigits: 1,
            }).format(population)}
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1">Participants</Typography>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {Intl.NumberFormat('en-US', {
              notation: 'compact',
              maximumFractionDigits: 1,
            }).format(participants)}
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1">Established</Typography>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {established}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

export default CityNameWidget;
