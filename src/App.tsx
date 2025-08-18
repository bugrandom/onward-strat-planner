import MapCanvas from './components/MapCanvas';
import ShapePalette from './components/ShapePalette';
import DropLayer from './components/DropLayer';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar with draggable shapes */}
      <ShapePalette />

      {/* Map area with drop layer */}
      <div className="relative flex-1 flex items-center justify-center">
        <MapCanvas />
        <DropLayer />
      </div>
    </div>
  );
}
