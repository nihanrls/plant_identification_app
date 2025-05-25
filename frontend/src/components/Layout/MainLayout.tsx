import React, { ReactNode } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import DashboardHeader from '../Dashboard/DashboardHeader';
import PlantList from '../Dashboard/PlantList';
import CalendarWidget from '../Dashboard/CalendarWidget';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
