import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import DashboardHeader from '../Dashboard/DashboardHeader';
import PlantList from '../Dashboard/PlantList';
import CalendarWidget from '../Dashboard/CalendarWidget';

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-accent">
      <Sidebar />
      <main className="flex-1 p-8">
        <DashboardHeader />
        <PlantList />
        <CalendarWidget />
      </main>
    </div>
  );
}
