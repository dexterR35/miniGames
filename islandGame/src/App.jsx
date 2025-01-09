import React, { useState } from 'react';
import { AppProvider } from './contexts/AppContext';
import ThreeScene from './components/ThreeScene';
import IslandPage from './pages/IslandPage';

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);

  return (
    <AppProvider>
      {selectedMonth === null ? (
        <ThreeScene onIslandClick={setSelectedMonth} />
      ) : (
        <IslandPage selectedMonth={selectedMonth} />
      )}
    </AppProvider>
  );
};

export default App;
