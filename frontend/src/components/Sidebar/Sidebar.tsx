import React from 'react';
import { useLocation } from 'react-router-dom';
import SidebarItem from './SidebarItem';
import Favorites from './Favorites';

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside className="w-64 h-full bg-primary rounded-xl m-4 p-6 flex flex-col shadow-lg">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-green-800">Plant Care</h1>
      </div>
      <nav className="flex-1">
        <SidebarItem 
          icon="🏠" 
          label="Home" 
          active={isActive('/')} 
          path="/"
        />
        <SidebarItem 
          icon="🌱" 
          label="My Plants" 
          active={isActive('/my-plants')} 
          path="/my-plants"
        />
        <SidebarItem 
          icon="📷" 
          label="Identify" 
          active={isActive('/identify')} 
          path="/identify"
        />
        <SidebarItem 
          icon="❓" 
          label="Help" 
          active={isActive('/help')} 
          path="/help"
        />
      </nav>
      <Favorites />
    </aside>
  );
}
