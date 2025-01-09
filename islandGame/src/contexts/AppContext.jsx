import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [unlockedIslands, setUnlockedIslands] = useState([0, 1, 2, 3]);
  const [completedDays, setCompletedDays] = useState({});

  const markDayCompleted = (month, day) => {
    setCompletedDays((prev) => ({
      ...prev,
      [month]: [...(prev[month] || []), day],
    }));
  };

  return (
    <AppContext.Provider
      value={{ currentMonth, unlockedIslands, completedDays, markDayCompleted }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
