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
    <div className="flex flex-col balance-card rounded-2xl bg-[#6A0DAD] p-[10px] pc:p-2 pc:pb-[10px] pb-[15px] sm:p-6 shadow-lg overflow-hidden gap-[6px]"
      style={{ backgroundImage: `url(${dicesBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <h2 className="gap-[10px] pc:gap-2 text-2xl pc:text-lg pc:leading-4 leading-7 font-semibold text-white">Баланс</h2>

      <div className="flex flex-col gap-2 pc:gap-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <img src={taxiIcon} alt="TAXI" className="w-[15px] h-[15px] pc:2-3 pc:h-3" />
            <span className="text-xs pc:text-[10px] pc:leading-[10px] leading-[14px] font-medium text-white">$TAXI</span>
          </div>
          <span className="text-xs leading-4 text-white">{formatNumber(taxiBalance)}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <img src={virusIcon} alt="VIRUS" className="w-[15px] h-[15px] pc:2-3 pc:h-3" />
            <span className="text-xs pc:text-[10px] pc:leading-[10px] leading-[14px] font-medium text-white">$VIRUS</span>
          </div>
          <span className="text-xs leading-4 text-white">{formatNumber(virusBalance)}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <img src={diceIcon} alt="DICE" className="w-[15px] h-[15px] pc:2-3 pc:h-3" />
            <span className="text-xs pc:text-[10px] pc:leading-[10px] leading-[14px] font-medium text-white">$DICE</span>
          </div>
          <span className="text-xs leading-4 text-white">{formatNumber(diceBalance)}</span>
        </div>
      </div>
    </div>
  );
}

export default BalanceStatus;
