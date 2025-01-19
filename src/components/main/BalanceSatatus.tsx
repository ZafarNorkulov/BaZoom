import taxiIcon from '/assets/taxi-icon.png';
import virusIcon from '/assets/virus-icon.png';
import diceIcon from '/assets/dice-icon.png';
import dicesBackground from '/assets/dices.png';
import { formatNumber } from "../../services/UIService";

interface BalanceStatusProps {
  taxiBalance: number;
  virusBalance: number;
  diceBalance: number;
}

function BalanceStatus({ taxiBalance, virusBalance, diceBalance }: BalanceStatusProps) {

  return (
    <div className="balance-card rounded-2xl bg-[#6A0DAD] p-4 sm:p-6 shadow-lg overflow-hidden"
      style={{ backgroundImage: `url(${dicesBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <h2 className="mb-3 sm:mb-4 text-lg sm:text-2xl font-bold text-white">Баланс</h2>

      <div className="flex flex-col space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-blue-500">
              <img src={taxiIcon} alt="TAXI" className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <span className="text-sm sm:text-base font-semibold text-white">$TAXI</span>
          </div>
          <span className="text-base sm:text-xl font-bold text-white">{formatNumber(taxiBalance)}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-purple-500">
              <img src={virusIcon} alt="VIRUS" className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <span className="text-sm sm:text-base font-semibold text-white">$VIRUS</span>
          </div>
          <span className="text-base sm:text-xl font-bold text-white">{formatNumber(virusBalance)}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-blue-600">
              <img src={diceIcon} alt="DICE" className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <span className="text-sm sm:text-base font-semibold text-white">$DICE</span>
          </div>
          <span className="text-base sm:text-xl font-bold text-white">{formatNumber(diceBalance)}</span>
        </div>
      </div>
    </div>
  );
}

export default BalanceStatus;
