import { createPortal } from 'react-dom';
import TokenItem from "./types";
import tokenItemIcon from "/assets/token-item.svg";

interface TokenSelectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (token: TokenItem) => void;
}

const tokens: TokenItem[] = [
    { symbol: '$DICE', icon: <img src="/assets/dice-icon.png" className="h-5 w-5" /> },
    { symbol: '$NEW', icon: <img src="/assets/new-icon.png" className="h-5 w-5" /> },
    { symbol: '$ATERRA', icon: <img src="/assets/aterra-icon.png" className="h-5 w-5" /> }
];

function TokenSelectModal({ isOpen, onClose, onSelect }: TokenSelectModalProps) {
    if (!isOpen) return null;

    const modalContent = (
        <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm">
            <div className="flex h-full w-full items-center justify-center p-4">
                <div className="w-full max-w-md rounded-2xl bg-[#1E1E1E] p-6">
                    <div className="mb-6 text-center">
                        <div className="mb-2 flex justify-center">
                            <img src={tokenItemIcon} className="h-8 w-8" />
                        </div>
                        <h2 className="mb-1 text-xl font-bold text-white">Выбор токена для игры</h2>
                        <p className="text-sm text-gray">
                            Выберите токен для игры.<br />
                            В дальнейшем вы сможете изменить этот токен по собственному желанию.
                        </p>
                    </div>

                    <div className="space-y-3">
                        {tokens.map((token) => (
                            <button
                                key={token.symbol}
                                onClick={() => {
                                    onSelect(token);
                                    onClose();
                                }}
                                className="flex w-full items-center justify-between rounded-xl border border-[#2A2A2A] bg-[#2A2A2A] px-4 py-3 text-white hover:border-[#896CFE] hover:bg-[#2A2A2A]/50"
                            >
                                <span className="flex items-center gap-2">
                                    {token.icon}
                                    <span>{token.symbol}</span>
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}

export default TokenSelectModal;
