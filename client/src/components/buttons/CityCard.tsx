/* eslint-disable react/jsx-no-bind */
import { CardActionArea, CardContent, Typography, Card } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type CityCardProps = {
  cityName: string;
  accredited: any;
};

function CityCard({ cityName, accredited }: CityCardProps) {
  const navigate = useNavigate();
  const label = cityName.split(' city')[0];

  function handleClick() {
    const s = `/city-dashboard/${cityName}`;
    navigate(s);
  }

  return (
    <Card sx={{ p: 2, bgcolor: '#EDEDED', mb: 2, borderRadius: '8px' }}>
      <CardActionArea onClick={handleClick}>
        <CardContent>
          <Typography variant="h5">{label}</Typography>
          <Typography
            sx={{
              color: accredited ? '#0175C0' : '#657788',
              display: 'flex',
              alignItems: 'center',
            }}
            variant="subtitle1"
          >
            <b>{accredited ? <i>Accredited</i> : <i>Not Accredited</i>}</b>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CityCard;
