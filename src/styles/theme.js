import { createTheme } from '@mui/material/styles';

// Светлая тема (оставляем как было)
export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
            light: '#42a5f5',
            dark: '#1565c0',
        },
        secondary: {
            main: '#9c27b0',
            light: '#ba68c8',
            dark: '#7b1fa2',
        },
        background: {
            default: '#f5f5f5',
            paper: '#ffffff',
        },
        success: {
            main: '#2e7d32',
        },
        warning: {
            main: '#ed6c02',
        },
        error: {
            main: '#d32f2f',
        },
        text: {
            primary: '#1a1a1a',
            secondary: '#666666',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h4: {
            fontWeight: 600,
        },
        h6: {
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600,
                },
            },
        },
    },
});

// Улучшенная тёмная тема
export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9',
            light: '#e3f2fd',
            dark: '#42a5f5',
            contrastText: '#000000',
        },
        secondary: {
            main: '#ce93d8',
            light: '#f3e5f5',
            dark: '#ab47bc',
        },
        background: {
            default: '#0d1117', // Более тёмный фон для лучшего контраста
            paper: '#161b22',   // Карточки немного светлее фона
        },
        success: {
            main: '#4caf50',
        },
        warning: {
            main: '#ff9800',
        },
        error: {
            main: '#f44336',
        },
        text: {
            primary: '#f0f6fc', // Более яркий белый для основного текста
            secondary: '#8b949e', // Серый для второстепенного текста
        },
        divider: 'rgba(240, 246, 252, 0.1)',
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h4: {
            fontWeight: 600,
            color: '#f0f6fc',
        },
        h6: {
            fontWeight: 600,
            color: '#f0f6fc',
        },
        body1: {
            color: '#f0f6fc',
        },
        body2: {
            color: '#8b949e',
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    backgroundImage: 'none',
                    border: '1px solid rgba(240, 246, 252, 0.1)',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600,
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    backgroundColor: '#161b22',
                    borderBottom: '1px solid rgba(240, 246, 252, 0.1)',
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
        MuiAlert: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
    },
});