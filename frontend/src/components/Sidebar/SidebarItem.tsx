import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SidebarItemProps {
  icon: string;
  label: string;
  active?: boolean;
  path: string;
}

export default function SidebarItem({ icon, label, active, path }: SidebarItemProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <div
      onClick={handleClick}
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
