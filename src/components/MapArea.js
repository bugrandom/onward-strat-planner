import PlayerCircle from './PlayerCircle';
import Marker from './Marker';

const MAP_WIDTH = 800;
const MAP_HEIGHT = 600;

const MapArea = ({ selectedMap, redPieces, bluePieces, markers, updatePiecePosition, updateMarkerPosition, handleMapClick }) => {
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
          <PlayerCircle key={p.id} piece={p} onDrag={updatePiecePosition} />
        ))}
        {bluePieces.map((p) => (
          <PlayerCircle key={p.id} piece={p} onDrag={updatePiecePosition} />
        ))}
        {markers.map((m) => (
          <Marker key={m.id} marker={m} onDrag={updateMarkerPosition} />
        ))}
      </svg>
    </div>
  );
};

export default MapArea;

