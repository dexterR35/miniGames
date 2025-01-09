import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext'; // Assuming you have AppContext setup for states

const IslandMesh = ({ month, onClick }) => {
  const { unlockedIslands } = useAppContext();
  const isUnlocked = unlockedIslands.includes(month);

  // State to toggle the visibility of days when the island is clicked
  const [showDays, setShowDays] = useState(false);
  const islandRef = useRef();

  // Center positioning of islands (5 units apart horizontally)
  const [position, setPosition] = useState([0, 0, 0]);

  useEffect(() => {
    // Position the islands in the center of the screen with a little gap between them
    const gap = 2.5; // The gap between each island

    // Set position for each month (0 - 3)
    const positions = [
      [-gap, 0, 0],  // First island (left)
      [gap, 0, 0],   // Second island (right)
      [0, gap, 0],   // Third island (top)
      [0, -gap, 0],  // Fourth island (bottom)
    ];

    setPosition(positions[month]);  // Set position based on the month

  }, [month]);

  const handleClick = () => {
    if (isUnlocked) {
      setShowDays(!showDays); // Toggle visibility of days inside the island
      onClick(month); // Pass the month to the parent component
    }
  };

  return (
    <group ref={islandRef} onClick={handleClick} position={position}>
      {/* Island Box */}
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color={isUnlocked ? 'green' : 'gray'} />
      </mesh>

      {/* Optionally, display days inside the island */}
      {showDays && (
        <group>
          {/* You can use a loop to display days or other content */}
          <mesh position={[0, 0, 1]}>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial color="blue" />
          </mesh>
        </group>
      )}
    </group>
  );
};

export default IslandMesh;
