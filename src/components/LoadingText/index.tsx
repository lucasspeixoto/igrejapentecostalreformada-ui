import { PiSpinnerGapThin } from 'react-icons/pi';

export const LoadingText = () => {
  return (
    <span className="motion-safe:animate-spin">
      <PiSpinnerGapThin className="text-bold mx-2 font-bold text-meta-3" size={24} />
    </span>
  );
};
