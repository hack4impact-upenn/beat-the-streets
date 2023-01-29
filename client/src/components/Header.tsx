import React from 'react';
import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';

import COLORS from '../assets/colors';
import Logo from '../assets/beat-the-streets-logo.png';

export default function Header() {
  const navigate = useNavigate();

  const onNavigateAdminDashboard = () => {
    navigate('/users');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: COLORS.primaryBlue,
          paddingX: '16px',
          paddingY: '11px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <img alt="beat the streets logo" src={Logo} width={95} height={44} />
        <Button
          sx={{ color: 'white', borderColor: 'white' }}
          variant="outlined"
          color="primary"
          onClick={onNavigateAdminDashboard}
        >
          Admin Dashboard
        </Button>
      </AppBar>
    </Box>
  );
}
