import React from 'react';
import PlayerCircle from './PlayerCircle';

export default function MapPlanner({ players }) {
  return (
    <svg width={800} height={600} style={{ background: '#333' }}>
      {players.map((player) => (
        <PlayerCircle key={player.id} piece={player} />
      ))}
    </svg>
  );
}

