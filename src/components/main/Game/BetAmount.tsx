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
            <div className="flex flex-col gap-[7px]">
                <BetDisplay amount={amount} onChangeToken={onChangeToken} />

                {/* Кнопки управления */}
                <div className="grid grid-cols-3 gap-[7px]">
                    <button
                        onClick={onDecrease}
                        className="rounded-xl bg-gradient-to-r h-[48px] from-[#ED172B] to-[#931216]  text-2xl font-bold text-white"
                    >
                        -
                    </button>
                    <button
                        onClick={() => setIsMultiplierActive(!isMultiplierActive)}
                        className="rounded-xl h-[48px] bg-[#2A2A2A] text-lg text-white"
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
                        className="rounded-xl bg-gradient-to-r from-[#21CC51] to-[#16E555] h-[48px] text-2xl font-bold text-white"
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BetAmount;