import { useCallback, useEffect, useState } from "react";
import { useInitData } from "@vkruglikov/react-telegram-web-app";
import { getProfile } from "../../services/UserService";
import BalanceStatus from "../../components/main/BalanceSatatus";
import GameControls from "../../components/main/GameControls";
import JackpotCard from "../../components/main/JackpotCard";
import WinDisplay from "../../components/main/WinDisplay";

function MainPage() {
  const [initDataUnsafe] = useInitData();
  const user = initDataUnsafe!.user!;

  const [balances, setBalances] = useState({
    taxi: 0,
    virus: 0,
    dice: 0,
  });
  const [jackpot] = useState({
    current: 233,
    required: 41000,
  });
  const [, initData] = useInitData();

  const updateGameState = useCallback(async () => {
    if (!initData) return;
    const profile = await getProfile(initData);
    setBalances({
      taxi: profile?.taxiBalance || 0,
      virus: profile?.virusBalance || 0,
      dice: profile?.diceBalance || 0,
    });
  }, [initData]);

  useEffect(() => {
    updateGameState();
  }, [updateGameState]);

  useEffect(() => {
    if (!user) return;
    updateGameState();
  }, [user]);

  return (
    <div className="bg-gray-900 flex min-h-screen flex-col">
      {/* Баннер джекпота */}

      <div className="flex flex-1 flex-col gap-4 p-4">
        {/* Карточки баланса и джекпота */}
        <div className="grid grid-cols-2 gap-4">
          <BalanceStatus
            taxiBalance={balances.taxi}
            virusBalance={balances.virus}
            diceBalance={balances.dice}
          />
          <JackpotCard won={jackpot.current} required={jackpot.required} />
        </div>

        {/* Выигрыш */}
        <WinDisplay
          type="win"
          wins={[
            {
              amount: 233,
              token: {
                symbol: "$DICE",
                icon: <img src="/assets/dice-icon.png" className="h-5 w-5" />,
              },
            },
          ]}
        />

        {/* Игровые контролы */}
        {user.id ? <GameControls userId={user!.id} /> : null}
      </div>
    </div>
  );
}

export default MainPage;
