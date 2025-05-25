import React from 'react';

export default function CalendarWidget() {
  return (
    <div className="bg-accent rounded-xl p-4 shadow mt-8">
      <div className="font-bold text-green-800 mb-2">Upcoming Events</div>
      <ul className="text-green-900 text-sm">
        <li>May 25 - Repotting</li>
        <li>May 28 - Watering Day</li>
      </ul>
    </div>
  );
}
