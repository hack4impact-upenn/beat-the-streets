import React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import COLORS from '../../assets/colors';
import { useData } from '../../util/api';
import PhiladelphiaLogo from '../../assets/images/logos/BTS.Philadelphia.jpg';
import NewEnglandLogo from '../../assets/images/logos/BTS.NewEngland.png';
import NewYorkCityLogo from '../../assets/images/logos/BTS.NewYorkCity.jpg';
import LosAngelesLogo from '../../assets/images/logos/BTS.LosAngeles.jpg';
import LancasterLogo from '../../assets/images/logos/BTS.Lancaster.jpg';
import DCLogo from '../../assets/images/logos/BTS.DC.jpg';
import ClevelandLogo from '../../assets/images/logos/BTS.Cleveland.png';
import ChicagoLogo from '../../assets/images/logos/BTS.Chicago.jpg';
import BayAreaLogo from '../../assets/images/logos/BTS.BayArea.png';
import BaltimoreLogo from '../../assets/images/logos/BTS.Baltimore.png';
import NationalLogo from '../../assets/images/logos/BTS.National.jpg';

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

    let Logo = '';
    if (cityData?.data.cityName === 'Philadelphia city, Pennsylvania') {
      Logo = PhiladelphiaLogo;
    } else if (cityData?.data.cityName === 'New York city, New York') {
      Logo = NewYorkCityLogo;
    } else if (cityData?.data.cityName === 'Los Angeles city, California') {
      Logo = LosAngelesLogo;
    } else if (cityData?.data.cityName === 'Lancaster city, California') {
      Logo = LancasterLogo;
    } else if (cityData?.data.cityName === 'Chicago city, Illinois') {
      Logo = ChicagoLogo;
    } else if (cityData?.data.cityName === 'Baltimore city, Marylands') {
      Logo = BaltimoreLogo;
    } else if (
      cityData?.data.cityName === 'Washington city, District of Columbia'
    ) {
      Logo = DCLogo;
    } else if (cityData?.data.cityName === 'Cleveland city, Ohio') {
      Logo = ClevelandLogo;
    } else if (cityData?.data.cityName === 'San Francisco city, California') {
      Logo = BayAreaLogo;
    } else if (cityData?.data.cityName === 'Boston city, Massachusetts') {
      Logo = NewEnglandLogo;
    } else {
      Logo = NationalLogo;
    }

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
      <Paper elevation={4} sx={{ p: 3, mr: 8, borderRadius: '16px' }}>
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
          <img src={Logo} alt="logo" width={100} height={100} />
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
