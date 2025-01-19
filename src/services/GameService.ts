interface GameStatusContract {
  total_users: number;
  total_balance: number;
}

async function getGameStatus(initData: string): Promise<GameStatusContract> {
  const resp = await fetch("/api/game/status", {
    method: "GET",
    headers: {
      "Init-Data": initData,
    },
  });
  return await (resp.json() as Promise<GameStatusContract>);
}

export { getGameStatus };
export type { GameStatusContract };
