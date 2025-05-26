import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Home from './pages/Home';
import Identify from './pages/Identify';
import Calendar from './pages/Calendar';
import Help from './pages/Help';
import MyPlants from './pages/MyPlants';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/identify" element={<Identify />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/help" element={<Help />} />
          <Route path="/my-plants" element={<MyPlants />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
