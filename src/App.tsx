import MapCanvas from './components/MapCanvas';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <header className="p-4 text-center text-xl font-bold">Onward Strategy Planner</header>
      <main className="flex-1 overflow-hidden">
        <div className="w-full h-full">
          <MapCanvas />
        </div>
      </main>
    </div>
  );
}
