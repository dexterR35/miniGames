import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { gifts } from '../utils/gifts';

const IslandPage = ({ selectedMonth }) => {
  const { completedDays, markDayCompleted } = useAppContext();
  const [selectedDay, setSelectedDay] = useState(null);

  const daysInMonth = new Date(2025, selectedMonth + 1, 0).getDate();
  
  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const handleComplete = (day) => {
    markDayCompleted(selectedMonth, day);
    setSelectedDay(null); // Close the popup after completing the day
  };

  return (
    <div>
      <h2>Island {selectedMonth + 1}</h2>
      <div className="days-container">
        {[...Array(daysInMonth).keys()].map((day) => (
          <button
            key={day}
            className={`day-button ${completedDays[selectedMonth]?.includes(day + 1) ? 'completed' : ''}`}
            onClick={() => handleDayClick(day + 1)}
          >
            Day {day + 1}
          </button>
        ))}
      </div>

      {selectedDay && (
        <div className="minigame-popup">
          <h3>Minigame for Day {selectedDay}</h3>
          <p>Gift: {gifts[selectedMonth][selectedDay - 1]}</p>
          <button onClick={() => handleComplete(selectedDay)}>Complete</button>
          <button onClick={() => setSelectedDay(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default IslandPage;
