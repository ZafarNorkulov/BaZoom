import TokenItem from "./Game/types";
import walletIcon from "/assets/wallet.svg";

interface TokenWin {
    amount: number;
    token: TokenItem;
}

interface WinDisplayProps {
    type: 'win' | 'loss';
    wins: TokenWin[];
}

function WinDisplay({ type, wins }: WinDisplayProps) {
    const isWin = type === 'win';
    const bgColor = isWin ? 'bg-[#1B3123]' : 'bg-[#3A1B1B]';
    const textColor = isWin ? 'text-[#4CAF50]' : 'text-[#ED172B]';
    const title = isWin ? 'Выигрыш' : 'Проигрыш';

    return (
        <div className={`flex items-center justify-between rounded-xl ${bgColor} px-4 py-3`}>
            <div className="flex items-center gap-2">
                <img src={walletIcon} alt="Wallet" className="h-7 w-7" />
                <span className={`font-medium ${textColor}`}>{title}</span>
            </div>

            <div className="flex items-center gap-3">
                {wins.map((win, index) => (
                    <div key={index} className="flex items-center gap-1">
                        <span className={`font-medium ${textColor}`}>
                            {win.amount > 0 ? '+' : ''}{win.amount}
                        </span>
                        <span className={`font-medium ${textColor}`}>
                            {win.token.symbol}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WinDisplay;
