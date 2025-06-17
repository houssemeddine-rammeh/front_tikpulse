import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
        }}
      >
        <Header />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 3,
          }}
        >
          <Container maxWidth="xl">
            {children}
          </Container>
        </Box>
        <Box
          component="footer"
          sx={{
            py: 2,
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="sm">
            <Box sx={{ textAlign: 'center' }}>
              © {new Date().getFullYear()} TikTok Agency Platform
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Layout; 

