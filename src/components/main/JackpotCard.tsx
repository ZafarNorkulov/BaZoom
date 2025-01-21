import jackpotItemBackground from '/assets/jackpot-item.png';
import diceIcon from '../../assets/taxi-icon.png';

interface JackpotCardProps {
  won: number;
  required: number;
}

function JackpotCard({ won, required }: JackpotCardProps) {
  return (
    <div className="jackpot-card h-full rounded-2xl bg-[#FFA500] p-4 sm:p-6 shadow-lg"
      style={{ backgroundImage: `url(${jackpotItemBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <h2 className="mb-3 sm:mb-4 text-2xl leading-7 font-semibold text-white">Джекпот</h2>
      <div className="flex flex-col space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs leading-4 font-medium text-white">Выиграно:</span>
          <div className="flex items-center gap-[5px]">
            <img src={diceIcon} alt="DICE" className="w-[15px] h-[15px] rounded-[4px]" />
            <span className="text-xs leading-[14px] text-white">{won}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs leading-4 font-medium text-white">Нужно:</span>
          <div className="flex items-center gap-[5px]">
            <img src={diceIcon} alt="DICE" className="w-[15px] h-[15px] rounded-[4px]" />
            <span className="text-xs leading-[14px] text-white">{required}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JackpotCard;