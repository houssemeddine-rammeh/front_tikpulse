import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, alpha } from '@mui/material';

const ThemeContext = createContext(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  useEffect(() => {
    const savedMode = localStorage.getItem('theme');
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#A259FF' : '#FF0050', // Purple for light, TikTok Pink for dark
        dark: mode === 'light' ? '#8B5CF6' : '#CC003D',
        light: mode === 'light' ? alpha('#A259FF', 0.8) : '#FF3366',
        contrastText: '#ffffff',
      },
      secondary: {
        main: mode === 'light' ? '#7C3AED' : '#25F4EE', // Purple for light, TikTok Cyan for dark
        dark: mode === 'light' ? '#6D28D9' : '#1DC4BE',
        light: mode === 'light' ? alpha('#7C3AED', 0.8) : '#4DF5F1',
        contrastText: mode === 'light' ? '#ffffff' : '#000000',
      },
      success: {
        main: '#10B981', // Light Green (positive percentage)
        dark: '#059669',
        light: '#6EE7B7',
        contrastText: '#ffffff',
      },
      error: {
        main: '#EF4444',
        dark: '#DC2626',
        light: '#FCA5A5',
        contrastText: '#ffffff',
      },
      warning: {
        main: '#F59E0B',
        dark: '#D97706',
        light: '#FCD34D',
        contrastText: '#000000',
      },
      info: {
        main: '#3B82F6',
        dark: '#2563EB',
        light: '#93C5FD',
        contrastText: '#ffffff',
      },
      text: {
        primary: mode === 'light' ? '#111827' : '#F9FAFB', // Black/Dark Gray for light mode, light gray for dark mode
        secondary: mode === 'light' ? '#1F2937' : '#F3F4F6',
        disabled: mode === 'light' ? 'rgba(0, 0, 0, 0.38)' : 'rgba(255, 255, 255, 0.5)',
      },
      background: {
        default: mode === 'light' ? '#F9FAFB' : '#000000', // Light Gray for light mode, TikTok Black for dark mode
        paper: mode === 'light' ? '#FFFFFF' : '#161823', // White for cards in light mode, TikTok Dark Paper for dark mode
      },
      divider: mode === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)',
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: '2.5rem',
        lineHeight: 1.2,
        letterSpacing: '-0.01562em',
        color: mode === 'light' ? '#111827' : '#F9FAFB',
      },
      h2: {
        fontWeight: 600,
        fontSize: '2rem',
        lineHeight: 1.2,
        letterSpacing: '-0.00833em',
        color: mode === 'light' ? '#111827' : '#F9FAFB',
      },
      h3: {
        fontWeight: 600,
        fontSize: '1.75rem',
        lineHeight: 1.2,
        letterSpacing: '0em',
        color: mode === 'light' ? '#111827' : '#F9FAFB',
      },
      h4: {
        fontWeight: 600,
        fontSize: '1.5rem',
        lineHeight: 1.2,
        letterSpacing: '0.00735em',
        color: mode === 'light' ? '#111827' : '#F9FAFB',
      },
      h5: {
        fontWeight: 600,
        fontSize: '1.25rem',
        lineHeight: 1.2,
        letterSpacing: '0em',
        color: mode === 'light' ? '#111827' : '#F9FAFB',
      },
      h6: {
        fontWeight: 600,
        fontSize: '1rem',
        lineHeight: 1.6,
        letterSpacing: '0.0075em',
        color: mode === 'light' ? '#111827' : '#F9FAFB',
      },
      subtitle1: {
        fontWeight: 500,
        fontSize: '1rem',
        lineHeight: 1.75,
        letterSpacing: '0.00938em',
      },
      subtitle2: {
        fontWeight: 500,
        fontSize: '0.875rem',
        lineHeight: 1.57,
        letterSpacing: '0.00714em',
      },
      body1: {
        fontWeight: 400,
        fontSize: '1rem',
        lineHeight: 1.5,
        letterSpacing: '0.00938em',
      },
      body2: {
        fontWeight: 400,
        fontSize: '0.875rem',
        lineHeight: 1.43,
        letterSpacing: '0.01071em',
      },
      button: {
        fontWeight: 500,
        fontSize: '0.875rem',
        lineHeight: 1.75,
        letterSpacing: '0.02857em',
        textTransform: 'none',
      },
      caption: {
        fontWeight: 400,
        fontSize: '0.75rem',
        lineHeight: 1.66,
        letterSpacing: '0.03333em',
      },
      overline: {
        fontWeight: 500,
        fontSize: '0.75rem',
        lineHeight: 2.66,
        letterSpacing: '0.08333em',
        textTransform: 'uppercase',
      },
    },
    shape: {
      borderRadius: 8,
    },
    spacing: 8,
    transitions: {
      easing: {
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
      },
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        standard: 300,
        complex: 375,
        enteringScreen: 225,
        leavingScreen: 195,
      },
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 500,
            padding: '10px 16px',
            lineHeight: 1.5,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            },
          },
          containedPrimary: {
            background: mode === 'light' 
              ? `linear-gradient(to right, #A259FF, #8B5CF6)`
              : `linear-gradient(to right, #FF0050, #CC003D)`,
            color: '#ffffff',
            '&:hover': {
              background: mode === 'light'
                ? `linear-gradient(to right, #8B5CF6, #7C3AED)`
                : `linear-gradient(to right, #CC003D, #AA0040)`,
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: mode === 'light' 
              ? '0 2px 12px rgba(0, 0, 0, 0.08)'
              : '0 4px 20px rgba(0, 0, 0, 0.4)',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: mode === 'light'
                ? '0 4px 20px rgba(0, 0, 0, 0.12)'
                : '0 8px 32px rgba(0, 0, 0, 0.6)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none', // Remove default MUI paper gradient
          },
        },
      },
    },
  });

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('theme', newMode);
  };

  const value = {
    mode,
    toggleMode,
    theme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}; 

