interface VideoConract {
  id: string;
  playback_url: string;
  reward: number;
  created_at: string;
  published: boolean;
}

interface VideoResponseContract {
  total: number;
  videos: VideoConract[];
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
  await fetch(`/api/videos/publish`, {
    method: "POST",
    headers: { "Init-Data": initData, "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });
}

async function createVideo(initData: string) {
  await fetch(`/api/videos/create`, {
    method: "GET",
    headers: { "Init-Data": initData },
  });
}

export { getUserVideos, publishVideo, createVideo };
export type { VideoConract };
