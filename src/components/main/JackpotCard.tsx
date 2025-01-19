import jackpotItemBackground from '/assets/jackpot-item.png';
import diceIcon from '/assets/dice-icon.png';

interface JackpotCardProps {
  won: number;
  required: number;
}

function JackpotCard({ won, required }: JackpotCardProps) {
  return (
    <div className="jackpot-card h-full rounded-2xl bg-[#FFA500] p-4 sm:p-6 shadow-lg"
    style={{ backgroundImage: `url(${jackpotItemBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <h2 className="mb-3 sm:mb-4 text-lg sm:text-2xl font-bold text-white">Джекпот</h2>
      <div className="flex flex-col space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm sm:text-base font-semibold text-white">Выиграно:</span>
          <div className="flex items-center space-x-2">
            <img src={diceIcon} alt="DICE" className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="text-base sm:text-xl font-bold text-white">{won}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm sm:text-base font-semibold text-white">Нужно:</span>
          <div className="flex items-center space-x-2">
            <img src={diceIcon} alt="DICE" className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="text-base sm:text-xl font-bold text-white">{required}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JackpotCard;