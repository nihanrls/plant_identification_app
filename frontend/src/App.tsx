import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { tr } from 'date-fns/locale';
import { FavoritesProvider } from './contexts/FavoritesContext';
import MainLayout from './components/Layout/MainLayout';
import Home from './pages/Home';
import Identify from './pages/Identify';
import Calendar from './pages/Calendar';
import Help from './pages/Help';
import MyPlants from './pages/MyPlants';
import PlantDetails from './pages/PlantDetails';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32', // Yeşil tonu
    },
    secondary: {
      main: '#81c784', // Açık yeşil
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={tr}>
        <FavoritesProvider>
          <Router>
            <MainLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/identify" element={<Identify />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/help" element={<Help />} />
                <Route path="/my-plants" element={<MyPlants />} />
                <Route path="/plants/:slug" element={<PlantDetails />} />
              </Routes>
            </MainLayout>
          </Router>
        </FavoritesProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
