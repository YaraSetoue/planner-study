import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2A2F38',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#4CAF50',
    },
    background: {
      default: '#F8F9FA',
      paper: '#FFFFFF',
    },
    error: {
      main: '#FF4444',
    },
    warning: {
      main: '#FFBB33',
    },
    success: {
      main: '#00C851',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Arial", sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 22px',
          fontSize: '0.875rem',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});