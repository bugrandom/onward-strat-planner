import PlayerCircle from './PlayerCircle';
import Marker from './Marker';
import { MAP_WIDTH, MAP_HEIGHT } from '../config';

export default function MapArea({
  selectedMap,
  redPieces,
  bluePieces,
  markers,
  updatePiecePosition,
  updateMarkerPosition,
  removePlayer,
  removeMarker,
  placingMarkerType,
  handleMapClick,
}) {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>{selectedMap.name} Strat Planner</h1>
      <svg
        width={MAP_WIDTH}
        height={MAP_HEIGHT}
        style={{
          border: '3px solid #555',
          borderRadius: 10,
          backgroundImage: `url(${selectedMap.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'block',
          userSelect: 'none',
        }}
        onClick={handleMapClick}
      >
        {redPieces.map((p) => (
          <PlayerCircle
            key={p.id}
            piece={p}
            onDrag={updatePiecePosition}
            onDelete={removePlayer}
          />
        ))}
        {bluePieces.map((p) => (
          <PlayerCircle
            key={p.id}
            piece={p}
            onDrag={updatePiecePosition}
            onDelete={removePlayer}
          />
        ))}
        {markers.map((m) => (
          <Marker key={m.id} marker={m} onDrag={updateMarkerPosition} onDelete={removeMarker} />
        ))}

        {/* Trash Can */}
        <image
          href="/icons/trash-can.png"
          x={MAP_WIDTH - 60}
          y={MAP_HEIGHT - 60}
          width={50}
          height={50}
        />
      </svg>
    </div>
  );
}
