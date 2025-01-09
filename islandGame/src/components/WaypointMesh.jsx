import React from 'react';
import { useAppContext } from '../contexts/AppContext';

const WaypointMesh = ({ month, day }) => {
  const { completedDays, currentMonth } = useAppContext();

  const status =
    month === currentMonth && day === new Date().getDate()
      ? 'current'
      : completedDays[month]?.includes(day)
      ? 'completed'
      : day < new Date().getDate()
      ? 'past'
      : 'locked';

  const color =
    status === 'current'
      ? 'yellow'
      : status === 'completed'
      ? 'blue'
      : status === 'past'
      ? 'gray'
      : 'red';

  return (
    <mesh position={[0, 0, day]}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default WaypointMesh;
