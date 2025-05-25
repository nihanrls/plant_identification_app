import React from 'react';

export default function Favorites() {
  return (
    <div className="mt-8">
      <div className="text-xs text-green-900 mb-2 font-semibold">Favoriler</div>
      <div className="flex flex-col gap-2">
        <span className="bg-accent-dark text-yellow-800 px-3 py-1 rounded-xl text-xs">Sukulentler</span>
        <span className="bg-primary-dark text-green-900 px-3 py-1 rounded-xl text-xs">Çiçekli Bitkiler</span>
        <span className="bg-accent text-yellow-900 px-3 py-1 rounded-xl text-xs">Kaktüsler</span>
      </div>
    </div>
  );
}
