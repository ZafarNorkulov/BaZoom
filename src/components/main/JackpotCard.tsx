import jackpotItemBackground from '/assets/jackpot-item.png';
import diceIcon from '../../assets/taxi-icon.png';

interface JackpotCardProps {
  won: number;
  required: number;
}

function JackpotCard({ won, required }: JackpotCardProps) {
  return (
    <div className="jackpot-card h-full rounded-2xl bg-[#FFA500] p-[10px] pb-[15px] sm:p-6 shadow-lg"
      style={{ backgroundImage: `url(${jackpotItemBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <h2 className="mb-3 sm:mb-4 text-2xl pc:text-lg pc:leading-4 leading-7 font-semibold text-white">Джекпот</h2>
      <div className="flex flex-col gap-[7px]">
        <div className="flex items-center justify-between">
          <span className="text-xs pc:text-[10px] pc:leading-3 leading-4 font-medium text-white">Выиграно:</span>
          <div className="flex items-center gap-[5px]">
            <img src={diceIcon} alt="DICE" className="w-[15px] h-[15px] pc:w-3 pc:h-3 rounded-[4px]" />
            <span className="text-xs pc:text-[10px] pc:leading-3 leading-[14px] text-white">{won}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs pc:text-[10px] pc:leading-3 leading-4 font-medium text-white">Нужно:</span>
          <div className="flex items-center gap-[5px]">
            <img src={diceIcon} alt="DICE" className="w-[15px] h-[15px] pc:w-3 pc:h-3 rounded-[4px]" />
            <span className="text-xs pc:text-[10px] pc:leading-3 leading-[14px] text-white">{required}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JackpotCard;