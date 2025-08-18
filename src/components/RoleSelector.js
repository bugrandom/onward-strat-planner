import React from 'react';
import './RoleSelector.css'; // Make sure to create this CSS file

const roles = [
  { name: 'Rifleman', shape: 'square' },
  { name: 'Specialist', shape: 'circle' },
  { name: 'Support', shape: 'hexagon' },
  { name: 'Marksman', shape: 'diamond' },
];

export default function RoleSelector({ selectedRole, onSelect }) {
  return (
    <div className="role-selector">
      {roles.map((role) => (
        <div
          key={role.name}
          className={`shape ${role.shape} ${selectedRole === role.name ? 'selected' : ''}`}
          onClick={() => onSelect(role.name)}
          title={role.name}
        />
      ))}
    </div>
  );
}

