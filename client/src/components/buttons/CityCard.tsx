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

  function handleClick() {
    const s = `/city-dashboard/${cityName}`;
    navigate(s);
  }

  if (accredited) {
    return (
      <Card sx={{ p: 2, bgcolor: '#EDEDED', mb: 2 }}>
        <CardActionArea>
          <CardContent onClick={handleClick}>
            <Typography variant="h5">{cityName}</Typography>
            <Typography variant="subtitle1">Accredited</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
  return (
    <Card sx={{ p: 2, bgcolor: '#EDEDED', mb: 2 }}>
      <CardActionArea>
        <CardContent onClick={handleClick}>
          <Typography variant="h5">{cityName}</Typography>
          <Typography variant="subtitle1">Not Accredited</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CityCard;
