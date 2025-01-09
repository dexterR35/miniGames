import React from 'react';
import { gifts } from '../utils/gifts';
import { useAppContext } from '../contexts/AppContext';

const Minigame = ({ month, day }) => {
  const { markDayCompleted } = useAppContext();

  const handleComplete = () => {
    markDayCompleted(month, day);
  };

  return (
    <div className="minigame">
      <h2>Minigame for Day {day}</h2>
      <p>Gift: {gifts[month][day - 1]}</p>
      <button onClick={handleComplete}>Complete</button>
    </div>
  );
};

export default Minigame;
