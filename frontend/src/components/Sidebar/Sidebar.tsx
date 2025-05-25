import React from 'react';
import SidebarItem from './SidebarItem';
import Favorites from './Favorites';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-primary rounded-xl m-4 p-6 flex flex-col shadow-lg">
      <nav className="flex-1">
        <SidebarItem icon="🏠" label="Ana Sayfa" active />
        <SidebarItem icon="🌱" label="Bitkilerim" />
        <SidebarItem icon="📷" label="Tanıma" />
        <SidebarItem icon="📅" label="Takvim" />
        <SidebarItem icon="❓" label="Yardım" />
      </nav>
      <Favorites />
    </aside>
  );
}
