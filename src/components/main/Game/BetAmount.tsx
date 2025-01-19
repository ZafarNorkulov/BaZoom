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
        <div className="relative mb-4">
            <div className="flex flex-col space-y-4">
                <BetDisplay amount={amount} onChangeToken={onChangeToken} />

                {/* Кнопки управления */}
                <div className="grid grid-cols-3 gap-4">
                    <button
                        onClick={onDecrease}
                        className="rounded-2xl bg-gradient-to-r from-[#ED172B] to-[#931216] py-4 text-3xl font-bold text-white"
                    >
                        -
                    </button>
                    <button
                        onClick={() => setIsMultiplierActive(!isMultiplierActive)}
                        className="rounded-2xl bg-[#2A2A2A] py-4 text-3xl font-bold text-white"
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
                        className="rounded-2xl bg-gradient-to-r from-[#21CC51] to-[#16E555] py-4 text-3xl font-bold text-white"
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BetAmount;