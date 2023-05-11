import React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import COLORS from '../../assets/colors';
import { useData } from '../../util/api';
import PhiladelphiaLogo from '../../assets/images/logos/BTS.Philadelphia.jpg';

type DefaultWidgetProps = {
  data1: any;
};

function CityNameWidget({ data1 }: DefaultWidgetProps) {
  const cityData = data1;

  if (cityData) {
    const accredited = cityData?.data.isAccredited ?? false;
    const counties = cityData?.data.countiesCovered;
    const established = cityData?.data.established ?? 0;
    const populationList: { [key: number]: number } =
      cityData?.data.indicators.population;
    const maleParticipantsList: { [key: number]: number } =
      cityData?.data.indicators.male_participants;
    const femaleParticipantsList: { [key: number]: number } =
      cityData?.data.indicators.female_participants;

    const population =
      Object.values(populationList)[Object.values(populationList).length - 1];
    const participants =
      maleParticipantsList != null
        ? Object.values(maleParticipantsList)[
            Object.values(maleParticipantsList).length - 1
          ] +
          Object.values(femaleParticipantsList)[
            Object.values(femaleParticipantsList).length - 1
          ]
        : 0;

    return (
      <Paper elevation={1} sx={{ p: 3, mr: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mr: 1 }}>
          <Box>
            <Typography variant="h4">
              {cityData?.data.cityName.split(' city')[0]}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ color: COLORS.gray, fontWeight: 'bold' }}
            >
              {accredited ? 'Accredited' : `Not Accredited`}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ color: COLORS.gray, mb: 10, fontStyle: 'italic' }}
            >
              {counties.join(', ')}
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

  return <Paper elevation={1} sx={{ position: 'fixed', p: 3 }} />;
}

export default CityNameWidget;
