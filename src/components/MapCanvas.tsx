import IconOverlay from './IconOverlay';
import mapImage from '../assets/map.png';

interface Props {
  selectedRole: string;
}

const MapCanvas = ({ selectedRole }: Props) => {
  return (
    <div className="relative w-full h-[600px] bg-cover bg-center" style={{ backgroundImage: `url(${mapImage})` }}>
      <IconOverlay role={selectedRole} />
    </div>
  );
};

export default MapCanvas;

