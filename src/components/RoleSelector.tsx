interface Props {
  selectedRole: string;
  setRole: (role: string) => void;
}

const roles = ['scout', 'defender', 'medic'];

const RoleSelector = ({ selectedRole, setRole }: Props) => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Select Role</h2>
      <div className="space-y-2">
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => setRole(role)}
            className={`w-full py-2 px-4 rounded ${
              selectedRole === role ? 'bg-blue-600' : 'bg-gray-700'
            }`}
          >
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoleSelector;

