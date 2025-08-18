const SidebarLeft = ({ placingMarkerType, setPlacingMarkerType, markerTypes }) => (
  <div
    style={{
      width: 160,
      backgroundColor: '#222',
      padding: 15,
      borderRadius: 8,
      border: '2px solid #444',
    }}
  >
    <h3>Markers</h3>
    <button
      onClick={() => setPlacingMarkerType(markerTypes.FRAG)}
      style={{
        width: '100%',
        marginBottom: 8,
        padding: '8px',
        backgroundColor:
          placingMarkerType === markerTypes.FRAG ? 'orange' : '#444',
        color: 'white',
        border: 'none',
        borderRadius: 5,
        cursor: 'pointer',
      }}
    >
      Place Frag
    </button>
    <button
      onClick={() => setPlacingMarkerType(markerTypes.FLASH)}
      style={{
        width: '100%',
        marginBottom: 8,
        padding: '8px',
        backgroundColor:
          placingMarkerType === markerTypes.FLASH ? 'yellow' : '#444',
        color: '#000',
        border: 'none',
        borderRadius: 5,
        cursor: 'pointer',
      }}
    >
      Place Flash
    </button>
    <button
      onClick={() => setPlacingMarkerType(null)}
      style={{
        width: '100%',
        marginBottom: 8,
        padding: '8px',
        backgroundColor: '#666',
        color: 'white',
        border: 'none',
        borderRadius: 5,
        cursor: 'pointer',
      }}
    >
      Cancel
    </button>
  </div>
);

export default SidebarLeft;

