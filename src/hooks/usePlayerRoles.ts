import { useState } from 'react';

export const usePlayerRoles = () => {
  const [selectedRole, setSelectedRole] = useState('scout');
  return { selectedRole, setRole: setSelectedRole };
};

