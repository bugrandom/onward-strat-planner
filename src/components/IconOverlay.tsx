import scoutIcon from '../assets/icons/scout.png';
import defenderIcon from '../assets/icons/defender.png';
import medicIcon from '../assets/icons/medic.png';

const iconMap: Record<string, string> = {
  scout: scoutIcon,
  defender: defenderIcon,
  medic: medicIcon,
};

interface Props {
  role: string;
}

const IconOverlay = ({ role }: Props) => {
  const icon = iconMap[role];

  return (
    <img
      src={icon}
      alt={role}
      className="absolute top-[200px] left-[300px] w-10 h-10"
    />
  );
};

export default IconOverlay;

