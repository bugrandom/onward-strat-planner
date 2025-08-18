import MapCanvas from './components/MapCanvas';
import RoleSelector from './components/RoleSelector';
import { usePlayerRoles } from './hooks/usePlayerRoles';

function App() {
  const { selectedRole, setRole } = usePlayerRoles();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col md:flex-row">
      <div className="flex-1">
        <MapCanvas selectedRole={selectedRole} />
      </div>
      <div className="w-full md:w-64 p-4 bg-gray-800 border-l border-gray-700">
        <RoleSelector selectedRole={selectedRole} setRole={setRole} />
      </div>
    </div>
  );
}

export default App;

