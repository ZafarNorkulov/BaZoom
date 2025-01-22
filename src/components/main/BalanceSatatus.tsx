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
    <div className="balance-card rounded-2xl bg-[#6A0DAD] p-[10px] pb-[15px] sm:p-6 shadow-lg overflow-hidden"
      style={{ backgroundImage: `url(${dicesBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <h2 className="mb-3 sm:mb-4 text-2xl leading-7 font-semibold text-white">Баланс</h2>

      <div className="flex flex-col gap-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <img src={taxiIcon} alt="TAXI" className="w-[15px] h-[15px]" />
            <span className="text-xs leading-[14px] font-medium text-white">$TAXI</span>
          </div>
          <span className="text-xs leading-4 text-white">{formatNumber(taxiBalance)}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <img src={virusIcon} alt="VIRUS" className="w-[15px] h-[15px]" />
            <span className="text-xs leading-[14px] font-medium text-white">$VIRUS</span>
          </div>
          <span className="text-xs leading-4 text-white">{formatNumber(virusBalance)}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <img src={diceIcon} alt="DICE" className="w-[15px] h-[15px]" />
            <span className="text-xs leading-[14px] font-medium text-white">$DICE</span>
          </div>
          <span className="text-xs leading-4 text-white">{formatNumber(diceBalance)}</span>
        </div>
      </div>
    </div>
  );
}

export default BalanceStatus;
