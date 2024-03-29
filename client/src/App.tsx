import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { AppBar, CssBaseline, Toolbar } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import CityDataGrid from './AdminDashboard/CityDataGrid';
import theme from './assets/theme';
import { store, persistor } from './util/redux/store';
import NotFoundPage from './NotFound/NotFoundPage';
import {
  UnauthenticatedRoutesWrapper,
  ProtectedRoutesWrapper,
  DynamicRedirect,
  AdminRoutesWrapper,
} from './util/routes';
import VerifyAccountPage from './Authentication/VerifyAccountPage';
import RegisterPage from './Authentication/RegisterPage';
import LoginPage from './Authentication/LoginPage';
import EmailResetPasswordPage from './Authentication/EmailResetPasswordPage';
import ResetPasswordPage from './Authentication/ResetPasswordPage';
import AlertPopup from './components/AlertPopup';
import InviteRegisterPage from './Authentication/InviteRegisterPage';
import CityDashboard from './CityDashboard';
import AdminStatsPage from './AdminDashboard/AdminStatsPage';
import Header from './components/Header';
import AdminDashboardPage from './AdminDashboard/AdminDashboardPage';
import SplitGrid from './HomeDashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={theme}>
              <CssBaseline>
                <Header />
                <AlertPopup />
                <Routes>
                  <Route path="/grid" element={<CityDataGrid />} />
                  {/* Routes accessed only if user is not authenticated */}
                  <Route element={<UnauthenticatedRoutesWrapper />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route
                      path="/verify-account/:token"
                      element={<VerifyAccountPage />}
                    />
                    <Route
                      path="/email-reset"
                      element={<EmailResetPasswordPage />}
                    />
                    <Route
                      path="/reset-password/:token"
                      element={<ResetPasswordPage />}
                    />
                    <Route path="/city-dashboard" element={<CityDashboard />} />
                  </Route>
                  <Route
                    path="/invite/:token"
                    element={<InviteRegisterPage />}
                  />
                  {/* Routes accessed only if user is authenticated */}
                  <Route element={<ProtectedRoutesWrapper />}>
                    <Route path="/home-dashboard" element={<SplitGrid />} />
                    <Route
                      path="/city-dashboard/:cityName"
                      element={<CityDashboard />}
                    />
                  </Route>
                  {/* Routes accessed only if user is admin */}
                  <Route element={<AdminRoutesWrapper />}>
                    <Route
                      path="/admin-dashboard"
                      element={<AdminDashboardPage />}
                    />
                    <Route
                      path="/admin-stats/:cityName"
                      element={<CityDataGrid />}
                    />
                  </Route>
                  {/* Route which redirects to a different page depending on if the user is an authenticated or not by utilizing the DynamicRedirect component */}
                  <Route
                    path="/"
                    element={
                      <DynamicRedirect
                        unAuthPath="/login"
                        authPath="/home-dashboard"
                      />
                    }
                  />
                  {/* Route which is accessed if no other route is matched */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </CssBaseline>
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </div>
  );
}
export default App;
