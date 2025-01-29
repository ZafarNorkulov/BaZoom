import { useState } from 'react';
import diceIcon from '/assets/dice-icon.png';
import TokenSelectModal from './TokenSelectModal';
import TokenItem from './types';

interface BetDisplayProps {
    amount: number;
    onChangeToken?: () => void;
}

function BetDisplay({ amount, onChangeToken }: BetDisplayProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedToken, setSelectedToken] = useState<TokenItem>({
        symbol: '$DICE',
        icon: <img src={diceIcon} className="h-5 w-5" />
    });

    const handleTokenSelect = (token: TokenItem) => {
        setSelectedToken(token);
        // Additional token change logic here
        console.log(selectedToken)
    };

    return (
        <>
            <div className="relative h-[130px] pc:h-[110px] sm:h-[160px] md:h-[180px] lg:h-[200px] rounded-2xl outline outline-1 outline-gray-700 w-full pc:w-[80%]">
                {onChangeToken && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-[#2A2A2A] absolute right-2 sm:right-3 md:right-4 top-2 sm:top-3 md:top-4 flex items-center gap-1 sm:gap-2 rounded-lg px-2 pc:px-1 sm:px-3 py-1.5 pc:py-[4px] sm:py-2 text-xs sm:text-sm text-200-white outline outline-1 outline-gray-700 hover:text-white"
                    >
                        <svg className="h-3 w-3 sm:h-4 sm:w-4 fill-white mr-1 sm:mr-2" viewBox="0 0 24 24">
                            <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
                        </svg>
                        <span className='text-[10px] leading-4 text-white'>Изменить токен</span>
                    </button>
                )}

                <div className="absolute left-1/2 top-1/2 pc:top-[60%]  -translate-x-1/2 -translate-y-1/2 text-center">
                    <span className="text-5xl font-bold text-white">{amount}</span>
                    <div className="mt-2 sm:mt-3 md:mt-4 flex flex-col items-center space-y-1 sm:space-y-2">
                        <div className="flex items-center space-x-1 sm:space-x-2">
                            <span className="text-lg sm:text-xl md:text-2xl text-gray-400">Ставка</span>
                            <img src={diceIcon} alt="DICE" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                        </div>
                    </div>
                </div>
            </div>

            <TokenSelectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSelect={handleTokenSelect}
            />
        </>
    );
}

export default BetDisplay;