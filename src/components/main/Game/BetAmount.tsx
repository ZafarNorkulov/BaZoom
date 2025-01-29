import { useState } from 'react';
import BetDisplay from './BetDisplay';

interface BetAmountProps {
    amount: number;
    onIncrease: () => void;
    onDecrease: () => void;
    onChangeToken?: () => void;
}

function BetAmount({ amount, onIncrease, onDecrease, onChangeToken }: BetAmountProps) {
    const [isMultiplierActive, setIsMultiplierActive] = useState(false);

    return (
        <div className="relative">
            <div className="flex flex-col items-center gap-[7px]  pc:flex-row">
                <BetDisplay amount={amount} onChangeToken={onChangeToken} />

                {/* Кнопки управления */}
                <div className="grid grid-cols-3 pc:grid-cols-6 gap-[7px] pc:gap-1 w-full pc:w-[20%]">
                    <button
                        onClick={onDecrease}
                        className="pc:col-span-12 rounded-xl bg-gradient-to-r h-[42px] from-[#ED172B] to-[#931216]  text-2xl font-bold text-white"
                    >
                        -
                    </button>
                    <button
                        onClick={() => setIsMultiplierActive(!isMultiplierActive)}
                        className="pc:col-span-12 rounded-xl h-[42px] bg-[#2A2A2A] text-lg text-white"
                        style={{
                            border: isMultiplierActive
                                ? '2px solid #939393'
                                : '2px solid #404040',
                        }}
                    >
                        {isMultiplierActive ? 'x2' : 'x1'}
                    </button>
                    <button
                        onClick={onIncrease}
                        className="pc:col-span-12 rounded-xl bg-gradient-to-r from-[#21CC51] to-[#16E555] h-[42px] text-2xl font-bold text-white"
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BetAmount;