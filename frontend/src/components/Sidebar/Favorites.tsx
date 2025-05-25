import React from 'react';

export default function Favorites() {
  return (
    <div className="mt-8">
      <div className="text-xs text-green-900 mb-2 font-semibold">Favorites</div>
      <div className="flex flex-col gap-2">
        <span className="bg-accent-dark text-yellow-800 px-3 py-1 rounded-xl text-xs">Succulents</span>
        <span className="bg-primary-dark text-green-900 px-3 py-1 rounded-xl text-xs">Flowering Plants</span>
        <span className="bg-accent text-yellow-900 px-3 py-1 rounded-xl text-xs">Cacti</span>
      </div>
    </div>
  );
}
