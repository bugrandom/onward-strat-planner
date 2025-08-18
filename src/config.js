export const MAP_WIDTH = 800;
export const MAP_HEIGHT = 600;

export const MAPS = [
  { name: 'Suburbia', image: '/maps/suburbia-clean.png' },
  { name: 'Quarantine', image: '/maps/quarantine.png' },
  { name: 'Downfall', image: '/maps/downfall.png' },
];

export const initialPieces = (prefix, y) =>
  Array.from({ length: 5 }, (_, i) => ({
    id: `${prefix}${i + 1}`,
    label: String.fromCharCode(65 + i),
    x: 100 + i * 60,
    y,
  }));

export const markerTypes = {
  FRAG: 'frag',
  FLASH: 'flash',
};

