import React from 'react';

interface SidebarItemProps {
  icon: any;
  label: string;
  active?: boolean;
}
export default function SidebarItem({ icon, label, active }: SidebarItemProps) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer mb-2 transition-colors ${
        active
          ? 'bg-accent text-green-800 font-semibold'
          : 'hover:bg-accent text-green-900'
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
    </div>
  );
}
