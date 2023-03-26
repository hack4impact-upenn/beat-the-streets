import React from 'react';
import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';

import COLORS from '../assets/colors';
import MainLogoWhite from '../assets/images/MainLogoWhite.png';

import { useAppDispatch, useAppSelector } from '../util/redux/hooks';
import { useData } from '../util/api';
import { logout as logoutAction } from '../util/redux/userSlice';
import { logout as logoutApi } from '../Home/api';

export default function Header() {
  const dispatch = useAppDispatch();
  const navigator = useNavigate();
  const adminData = useData('admin/adminstatus');

  const onNavigateAdminDashboard = () => {
    navigator('/users');
  };

  const logoutDispatch = () => dispatch(logoutAction());
  const handleLogout = async () => {
    if (await logoutApi()) {
      logoutDispatch();
      navigator('/login', { replace: true });
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: COLORS.primaryBlue,
          paddingX: '16px',
          paddingY: '11px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <img
          alt="beat the streets logo"
          src={MainLogoWhite}
          width={95}
          height={44}
        />
        <Box>
          {!adminData?.error && (
            <Button
              sx={{ color: 'white', borderColor: 'white', marginRight: 1 }}
              variant="outlined"
              color="primary"
              onClick={onNavigateAdminDashboard}
            >
              Admin Dashboard
            </Button>
          )}
          <Button
            sx={{ color: 'white', borderColor: 'white' }}
            variant="outlined"
            color="primary"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </AppBar>
    </Box>
  );
}
