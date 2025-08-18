const SidebarRight = ({ MAPS, selectedMap, setSelectedMap, redPieces, setRedPieces, bluePieces, setBluePieces }) => (
  <div
    style={{
      width: 200,
      backgroundColor: '#222',
      padding: 15,
      borderRadius: 8,
      border: '2px solid #444',
    }}
  >
    <h3>Map</h3>
    <select
      value={selectedMap.name}
      onChange={(e) =>
        setSelectedMap(MAPS.find((m) => m.name === e.target.value))
      }
      style={{
        width: '100%',
        padding: '8px',
        borderRadius: 5,
        border: '1px solid #555',
        backgroundColor: '#333',
        color: '#eee',
      }}
    >
      {MAPS.map((m) => (
        <option key={m.name} value={m.name}>
          {m.name}
        </option>
      ))}
    </select>

    <h3 style={{ marginTop: 20 }}>Players</h3>

    <div>
      <h4 style={{ color: 'red' }}>Red Team</h4>
      {redPieces.map((p) => (
        <div key={p.id} style={{ marginBottom: 6 }}>
          <input
            type="text"
            value={p.label}
            onChange={(e) =>
              setRedPieces((prev) =>
                prev.map((x) =>
                  x.id === p.id ? { ...x, label: e.target.value } : x
                )
              )
            }
            style={{
              width: '100%',
              padding: '4px',
              borderRadius: 4,
              border: '1px solid #555',
              backgroundColor: '#333',
              color: '#eee',
            }}
          />
        </div>
      ))}
    </div>

    <div>
      <h4 style={{ color: 'blue', marginTop: 10 }}>Blue Team</h4>
      {bluePieces.map((p) => (
        <div key={p.id} style={{ marginBottom: 6 }}>
          <input
            type="text"
            value={p.label}
            onChange={(e) =>
              setBluePieces((prev) =>
                prev.map((x) =>
                  x.id === p.id ? { ...x, label: e.target.value } : x
                )
              )
            }
            style={{
              width: '100%',
              padding: '4px',
              borderRadius: 4,
              border: '1px solid #555',
              backgroundColor: '#333',
              color: '#eee',
            }}
          />
        </div>
      ))}
    </div>
  </div>
);

export default SidebarRight;

