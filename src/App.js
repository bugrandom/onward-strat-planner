import React, { useState } from 'react';
import MapPlanner from './components/MapPlanner';
import RoleSelector from './components/RoleSelector';

export default function App() {
  const [players, setPlayers] = useState([
    { id: 'P1', x: 100, y: 100, label: '1', role: 'Rifleman' },
    { id: 'P2', x: 200, y: 150, label: '2', role: 'Specialist' },
  ]);

  const updateRole = (id, newRole) => {
    setPlayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, role: newRole } : p))
    );
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <MapPlanner players={players} />
      </div>
      <div style={{ width: '250px', padding: '1rem', background: '#111', color: '#fff' }}>
        <h3>Player Roles</h3>
        {players.map((player) => (
          <div key={player.id} style={{ marginBottom: '1rem' }}>
            <div>Player {player.label}</div>
            <RoleSelector
              selectedRole={player.role}
              onSelect={(role) => updateRole(player.id, role)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

