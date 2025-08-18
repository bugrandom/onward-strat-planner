import MapCanvas from './components/MapCanvas';
import ShapePalette from './components/ShapePalette';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar with draggable shapes */}
      <ShapePalette />

      {/* Main map area */}
      <div className="flex-1 flex items-center justify-center">
        <MapCanvas />
      </div>
    </div>
  );
}
