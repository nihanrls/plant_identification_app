import React from 'react';
import SidebarItem from './SidebarItem';
import Favorites from './Favorites';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-primary rounded-xl m-4 p-6 flex flex-col shadow-lg">
      <nav className="flex-1">
        <SidebarItem icon="🏠" label="Home" active />
        <SidebarItem icon="🌱" label="My Plants" />
        <SidebarItem icon="📷" label="Identify" />
        <SidebarItem icon="📅" label="Calendar" />
        <SidebarItem icon="❓" label="Help" />
      </nav>
      <Favorites />
    </aside>
  );
}
