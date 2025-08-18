import React, { useState } from "react";
import Draggable from "react-draggable";

// Player icons with custom colors
const PLAYER_ICONS = [
  { id: 1, color: "bg-red-500", label: "Player 1" },
  { id: 2, color: "bg-blue-500", label: "Player 2" },
  { id: 3, color: "bg-green-500", label: "Player 3" },
  { id: 4, color: "bg-yellow-500", label: "Player 4" },
  { id: 5, color: "bg-purple-500", label: "Player 5" },
  { id: 6, color: "bg-pink-500", label: "Player 6" },
];

// Maps available
const MAPS = [
  {
    name: "Quarantine",
    image: "/images/quarantine.jpg", // place in public/images/
  },
  {
    name: "Downfall",
    image: "/images/downfall.jpg", // place in public/images/
  },
  {
    name: "Suburbia",
    image: "/images/suburbia.jpg", // place in public/images/
  },
];

function App() {
  const [selectedMap, setSelectedMap] = useState(MAPS[0].image);
  const [placedPlayers, setPlacedPlayers] = useState([]);
  const [markers, setMarkers] = useState([]);

  // Handle player drop
  const handleDrop = (e, player) => {
    const mapRect = document.getElementById("map-area").getBoundingClientRect();
    const x = e.clientX - mapRect.left - 15;
    const y = e.clientY - mapRect.top - 15;

    setPlacedPlayers((prev) => [
      ...prev,
      { ...player, x, y, id: Date.now() },
    ]);
  };

  // Handle marker placement
  const handleMapClick = (e) => {
    const mapRect = document.getElementById("map-area").getBoundingClientRect();
    const x = e.clientX - mapRect.left - 10;
    const y = e.clientY - mapRect.top - 10;

    setMarkers((prev) => [...prev, { x, y, id: Date.now() }]);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar - Player Selection */}
      <div className="w-1/6 bg-gray-800 p-4 border-r border-gray-700">
        <h2 className="text-xl font-bold mb-4">Players</h2>
        <div className="space-y-3">
          {PLAYER_ICONS.map((player) => (
            <Draggable
              key={player.id}
              onStop={(e) => handleDrop(e, player)}
              position={{ x: 0, y: 0 }}
            >
              <div
                className={`w-10 h-10 rounded-full ${player.color} cursor-pointer flex items-center justify-center`}
                title={player.label}
              >
                {player.id}
              </div>
            </Draggable>
          ))}
        </div>
      </div>

      {/* Main Map Area */}
      <div className="flex-1 relative" id="map-area" onClick={handleMapClick}>
        <img
          src={selectedMap}
          alt="Selected Map"
          className="w-full h-full object-cover"
        />

        {/* Placed players */}
        {placedPlayers.map((player) => (
          <Draggable
            key={player.id}
            defaultPosition={{ x: player.x, y: player.y }}
          >
            <div
              className={`w-8 h-8 rounded-full ${player.color} absolute flex items-center justify-center`}
              title={player.label}
            >
              {player.id}
            </div>
          </Draggable>
        ))}

        {/* Markers */}
        {markers.map((marker) => (
          <div
            key={marker.id}
            className="w-5 h-5 bg-white rounded-full absolute border-2 border-black"
            style={{ left: marker.x, top: marker.y }}
          ></div>
        ))}
      </div>

      {/* Right Sidebar - Map Selection & Labels */}
      <div className="w-1/6 bg-gray-800 p-4 border-l border-gray-700">
        <h2 className="text-xl font-bold mb-4">Settings</h2>

        {/* Map Selector */}
        <label className="block mb-2">Select Map</label>
        <select
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded mb-4"
          onChange={(e) => setSelectedMap(e.target.value)}
          value={selectedMap}
        >
          {MAPS.map((map) => (
            <option key={map.name} value={map.image}>
              {map.name}
            </option>
          ))}
        </select>

        {/* Player Labels */}
        <h3 className="text-lg font-semibold mb-2">Player Labels</h3>
        <div className="space-y-2">
          {PLAYER_ICONS.map((player, idx) => (
            <div key={player.id} className="flex items-center space-x-2">
              <span
                className={`w-5 h-5 rounded-full ${player.color} inline-block`}
              ></span>
              <input
                type="text"
                className="flex-1 p-1 bg-gray-700 border border-gray-600 rounded"
                placeholder={player.label}
                onChange={(e) => {
                  PLAYER_ICONS[idx].label = e.target.value;
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
