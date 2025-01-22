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
            className={`rounded-xl h-[42px] py-3 px-6 text-lg leading-[22px] font-semibold text-white transition-colors w-full ${
                isActive ? 'bg-[#896CFE]' : 'bg-[#2A2A2A]'
            }`}
        >
            {value} {type === 'less' ? '<' : '>'} 
        </button>
    );
}

export default BetToggle;