import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Alert, Container } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const TikTokCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { loginWithTikTok } = useAuth();
  const [status, setStatus] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const error = searchParams.get('error');

        if (error) {
          throw new Error(`TikTok OAuth Error: ${error}`);
        }

        if (!code || !state) {
          throw new Error('Missing authorization code or state parameter');
        }

        setStatus('loading');

        // Send code to backend
        const codeVerifier = sessionStorage.getItem('tiktok_code_verifier');
        const url = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3002'}/api/v1/auth/tiktok/callback?code=${encodeURIComponent(code)}${codeVerifier ? `&code_verifier=${encodeURIComponent(codeVerifier)}` : ''}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: { 'Accept': 'application/json' },
        });
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || data.message || 'TikTok login failed');
        }
        const data = await response.json();
        // Login or register user with TikTok data
        await loginWithTikTok(data.token);
        setStatus('success');
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } catch (error) {
        console.error('TikTok OAuth callback error:', error);
        setStatus('error');
        setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    };
    handleCallback();
    // eslint-disable-next-line
  }, []);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh',
          textAlign: 'center'
        }}
      >
        {status === 'loading' && (
          <>
            <CircularProgress size={60} sx={{ mb: 3 }} />
            <Typography variant="h6" gutterBottom>
              Connecting your TikTok account...
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please wait while we complete the authentication process.
            </Typography>
          </>
        )}

        {status === 'success' && (
          <>
            <Box
              sx={{
                width: 60,
                height: 60,
                backgroundColor: 'success.main',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3
              }}
            >
              <Typography variant="h4" color="white">
                ✓
              </Typography>
            </Box>
            <Typography variant="h6" gutterBottom color="success.main">
              Successfully connected!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Redirecting you to your dashboard...
            </Typography>
          </>
        )}

        {status === 'error' && (
          <>
            <Alert severity="error" sx={{ mb: 3, width: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Connection Failed
              </Typography>
              <Typography variant="body2">
                {errorMessage || 'Failed to connect your TikTok account. Please try again.'}
              </Typography>
            </Alert>
            <Typography variant="body2" color="text.secondary">
              Redirecting you back to login...
            </Typography>
          </>
        )}
      </Box>
    </Container>
  );
};

export default TikTokCallbackPage; 

