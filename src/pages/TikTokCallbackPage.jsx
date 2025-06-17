import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Alert, Container } from '@mui/material';
import TikTokAuthService from '../services/tiktokAuth';
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

        // Handle TikTok OAuth callback
        const tikTokAuthService = TikTokAuthService.getInstance();
        const tikTokUser = await tikTokAuthService.handleCallback(code, state);

        // Login or register user with TikTok data
        await loginWithTikTok({
          tikTokId: tikTokUser.tikTokId,
          username: tikTokUser.username,
          displayName: tikTokUser.displayName,
          avatar: tikTokUser.avatar
        });

        setStatus('success');

        // Redirect to dashboard after successful login
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);

      } catch (error) {
        console.error('TikTok OAuth callback error:', error);
        setStatus('error');
        setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred');

        // Redirect to login page after error
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    };

    handleCallback();
  }, [searchParams, navigate, loginWithTikTok]);

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

