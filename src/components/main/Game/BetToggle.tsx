interface BetToggleProps {
    isActive?: boolean;
    value: number;
    type: 'less' | 'more';
    onClick?: () => void;
}

function BetToggle({ isActive = false, value, type, onClick }: BetToggleProps) {
    return (
        <button
            onClick={onClick}
            className={`rounded-2xl py-4 px-6 text-2xl font-bold text-white transition-colors w-full ${
                isActive ? 'bg-[#896CFE]' : 'bg-[#2A2A2A]'
            }`}
        >
            {value} {type === 'less' ? '<' : '>'} 
        </button>
    );
}

export default BetToggle;