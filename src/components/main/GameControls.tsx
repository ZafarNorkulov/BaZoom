import { useState } from 'react';
import HistoryButton from './Game/HistoryButton';
import BetAmount from './Game/BetAmount';
import BetToggle from './Game/BetToggle';

interface GameControlsProps {
    userId: number;
    className?: string;
}

function GameControls({ userId, className = '' }: GameControlsProps) {
    const [betAmount, setBetAmount] = useState(1);
    const [leftCurrentBet, setLeftCurrentBet] = useState(false);

    const increaseBet = () => setBetAmount(prev => prev + 1);
    const decreaseBet = () => setBetAmount(prev => Math.max(1, prev - 1));
    console.log(userId)
    return (
        <div className={` ${className}`}>
            <BetAmount
                amount={betAmount}
                onIncrease={increaseBet}
                onDecrease={decreaseBet}
                onChangeToken={() => { }}
            />

            <div className='gap-4 mt-4 flex items-center'>
                <BetToggle value={48} type="less" isActive={leftCurrentBet} onClick={() => { setLeftCurrentBet(true); }} />
                <BetToggle value={52} type="more" isActive={!leftCurrentBet} onClick={() => { setLeftCurrentBet(false); }} />
            </div>

            <div className='mt-4'>
                <HistoryButton />
            </div>
        </div>
    );
}

export default GameControls;