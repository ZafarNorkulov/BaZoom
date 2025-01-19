async function getReferalLink(initData: string): Promise<string> {
  const resp = await fetch("/api/referals/link", {
    method: "GET",
    headers: {
      "Init-Data": initData,
    },
  });
  return resp.json();
}

interface ReferalStatsContract {
  premium_count: number;
  basic_count: number;
  earned_tokens: number;
}

async function getReferalStats(
  initData: string,
): Promise<ReferalStatsContract> {
  const resp = await fetch("/api/referals/stats", {
    method: "GET",
    headers: {
      "Init-Data": initData,
    },
  });
  return resp.json();
}

interface ReferalProfileContract {
  id: number;
  name: string;
  earned: number;
}

async function getReferalProfiles(
  initData: string,
  limit: number,
  offset: number,
): Promise<ReferalProfileContract[]> {
  const resp = await fetch(
    `/api/referals/all?limit=${limit}&offset=${offset}`,
    {
      method: "GET",
      headers: {
        "Init-Data": initData,
      },
    },
  );
  return resp.json() as Promise<ReferalProfileContract[]>;
}

export { getReferalLink, getReferalStats, getReferalProfiles };
export type { ReferalStatsContract, ReferalProfileContract };
