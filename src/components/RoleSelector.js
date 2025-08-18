import React from 'react';

const roles = ['Rifleman', 'Specialist', 'Support', 'Marksman'];

export default function RoleSelector({ selectedRole, onSelect }) {
  return (
    <select value={selectedRole} onChange={(e) => onSelect(e.target.value)}>
      {roles.map((role) => (
        <option key={role} value={role}>
          {role}
        </option>
      ))}
    </select>
  );
}

