import React from 'react';

export default function CalendarWidget() {
  return (
    <div className="bg-accent rounded-xl p-4 shadow mt-8">
      <div className="font-bold text-green-800 mb-2">Yaklaşan Etkinlikler</div>
      <ul className="text-green-900 text-sm">
        <li>25 Mayıs - Saksı Değişimi</li>
        <li>28 Mayıs - Sulama Günü</li>
      </ul>
    </div>
  );
}
