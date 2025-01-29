import rightIcon from '/assets/right-icon.svg';

interface HistoryButtonProps {
    onClick?: () => void;
}

function HistoryButton({ onClick }: HistoryButtonProps) {
    return (
        <button
            onClick={onClick}
            className="flex items-center justify-between rounded-lg bg-[#2A2A2A] px-4 py-[7px] text-sm text-gray-400 hover:text-white w-full transition-colors"
        >
            <span className="flex items-center text-sm pc:text-xs pc:leading-4 leading-5 font-medium gap-2 text-white">
                <svg className="h-4 w-4 pc:w-3 pc:h-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.25 2.52.77-1.28-3.52-2.09V8z" />
                </svg>
                История
            </span>
            <img 
                src={rightIcon} 
                alt="right" 
                className="h-3 w-3 text-gray-400"
                style={{ filter: 'invert(70%)' }} 
            />
        </button>
    );
}

export default HistoryButton;