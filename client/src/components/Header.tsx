import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';

import COLORS from '../assets/colors';
import MainLogoWhite from '../assets/images/MainLogoWhite.png';

import { useAppDispatch, useAppSelector } from '../util/redux/hooks';
import { selectUser, logout as logoutAction } from '../util/redux/userSlice';
import { logout as logoutApi } from '../Home/api';

export default function Header() {
  const dispatch = useAppDispatch();
  const navigator = useNavigate();
  const location = useLocation();
  const user = useAppSelector(selectUser);
  console.log(user);

  const onNavigateAdminDashboard = () => {
    navigator('/admin-dashboard');
  };

  const onNavigateHomeDashboard = () => {
    navigator('/home-dashboard');
  };

  const handleLogin = () => {
    navigator('/login');
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
          {user.admin && location.pathname !== '/admin-dashboard' && (
            <Button
              sx={{ color: 'white', borderColor: 'white', marginRight: 2 }}
              variant="outlined"
              color="primary"
              onClick={onNavigateAdminDashboard}
            >
              Admin Dashboard
            </Button>
          )}
          {(location.pathname === '/admin-dashboard' ||
            location.pathname === '/login') && (
            <Button
              sx={{ color: 'white', borderColor: 'white', marginRight: 2 }}
              variant="outlined"
              color="primary"
              onClick={onNavigateHomeDashboard}
            >
              Home Dashboard
            </Button>
          )}
          {user.email !== null && (
            <Button
              sx={{ color: 'white', borderColor: 'white' }}
              variant="outlined"
              color="primary"
              onClick={handleLogout}
            >
              Log Out
            </Button>
          )}
          {user.email === null && (
            <Button
              sx={{ color: 'white', borderColor: 'white' }}
              variant="outlined"
              color="primary"
              onClick={handleLogin}
            >
              Log In
            </Button>
          )}
        </Box>
      </AppBar>
    </Box>
  );
}
