interface BetButtonsProps {
  onLessThanClick?: () => void;
  onGreaterThanClick?: () => void;
}

function BetButtons({ onLessThanClick, onGreaterThanClick }: BetButtonsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <button 
        onClick={onLessThanClick}
        className="rounded-2xl bg-[#896CFE] py-4 text-2xl font-bold text-white"
      >
        48 &lt;
      </button>
      <button 
        onClick={onGreaterThanClick}
        className="rounded-2xl bg-[#2A2A2A] py-4 text-2xl font-bold text-white"
      >
        &gt; 52
      </button>
    </div>
  );
}

export default BetButtons;