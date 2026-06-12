import { createTheme } from '@mui/material/styles'

export const appTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2196f3',
      dark: '#1565c0',
      light: '#64b5f6',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#673ab7',
      dark: '#512da8',
      light: '#9575cd',
    },
    success: {
      main: '#36b37e',
    },
    background: {
      default: '#f7faff',
      paper: '#ffffff',
    },
    text: {
      primary: '#1f2937',
      secondary: '#64748b',
    },
    divider: '#e5edf6',
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: 'Inter, Roboto, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: {
      fontWeight: 900,
      letterSpacing: 0,
    },
    h2: {
      fontWeight: 900,
      letterSpacing: 0,
    },
    h3: {
      fontWeight: 900,
      letterSpacing: 0,
    },
    button: {
      fontWeight: 800,
      textTransform: 'none',
      letterSpacing: 0,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          minHeight: 38,
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 10px 30px rgba(30, 64, 175, 0.08)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
})
