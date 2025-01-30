interface VideoContract {
  id: string;
  playback_url: string;
  reward: number;
  created_at: string;
  published: boolean;
}

interface VideoResponseContract {
  items: VideoContract[]; // Foydalanuvchining videolari
  total: number; // Jami videolar soni
}


async function getUserVideos(
  initData: string,
  limit: number,
  offset: number,
): Promise<VideoResponseContract> {
  const resp = await fetch(`/api/videos/all?limit=${limit}&offset=${offset}`, {
    method: "GET",
    headers: {
      "Init-Data": initData,
    },
  });
  return resp.json() as Promise<VideoResponseContract>;
}

async function publishVideo(initData: string, id: string, comment: string) {
  const req = { id: id, comment: comment };
  await fetch(`/apivideos/publish`, {
    method: "POST",
    headers: { "Init-Data": initData, "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });
}

async function createVideo(initData: string) {
  await fetch(`/apivideos/create`, {
    method: "GET",
    headers: { "Init-Data": initData },
  });
}

export { getUserVideos, publishVideo, createVideo };
export type { VideoContract, VideoResponseContract};
