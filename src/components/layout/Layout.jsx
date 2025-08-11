import React from 'react';
import { Box, Container, CssBaseline, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
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
              <Typography variant="body2" color="text.secondary">
                © {new Date().getFullYear()} TikTok Agency Platform
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Link
                  component={RouterLink}
                  to="/privacy"
                  color="text.secondary"
                  sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                  Privacy Policy & Terms of Service
                </Link>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Layout; 

