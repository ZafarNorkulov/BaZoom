import { useCallback, useEffect, useRef, useState } from "react";
import {
  getUserVideos,
  publishVideo,
  VideoConract,
} from "../../services/VideoService";
import { useInitData } from "@vkruglikov/react-telegram-web-app";
import VideoItem from "./VideoItem";
import cancelIcon from "./assets/cancel.svg";
import { useTranslation } from "react-i18next";
import OptionalButton from "../../components/optional-button/OptionalButton";

function VideosPage() {
  const [videos, setVideos] = useState<VideoConract[]>([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 10;
  const [, initData] = useInitData();
  const [showPublicationPopup, setShowPublicationPopup] = useState(false);
  const [comment, setComment] = useState("");
  const [pending, setPending] = useState(false);
  const [publishingVideo, setPublishingVideo] = useState<
    VideoConract | undefined
  >(undefined);

  const { t } = useTranslation();

  const observerTarget = useRef(null);

  useEffect(() => {
    getUserVideos(initData!, offset, limit).then((resp) => {
      setTotal(resp.total);
      setVideos(resp.videos);
    });
  }, []);

  const fetchVideos = useCallback(async () => {
    if (loading) return;
    if (offset >= total) return;
    setLoading(true);
    try {
      const newVideos = await getUserVideos(initData!, limit, offset);
      setVideos((videos) => [...videos, ...newVideos.videos]);
      setOffset((offset) => Math.min(offset + limit, total));
    } finally {
      setLoading(false);
    }
  }, [limit, initData, offset, total]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchVideos();
        }
      },
      { threshold: 1 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [fetchVideos]);

  const onPublishClick = useCallback((v: VideoConract) => {
    setShowPublicationPopup(true);
    setPublishingVideo(v);
  }, []);

  const onVideoPublish = async () => {
    setPending(true);
    await publishVideo(initData!, publishingVideo!.id, comment);
    publishingVideo!.published = true;
    setVideos([...videos]);
    setPending(false);
    setShowPublicationPopup(false);
  };
  return (
    <div className="flex w-screen flex-col items-center space-y-4 p-4 pl-4 pr-4">
      {showPublicationPopup ? (
        <div className="absolute left-0 top-0 z-10 flex h-full w-full justify-center">
          <div className="relative mt-[30%] flex h-max w-[70vw] flex-col rounded-xl bg-darkgray">
            <p className="border-b border-[#808080] p-2 text-center font-semibold text-white">
              {t("pages.boosts.video.publication")}
            </p>
            <img
              src={cancelIcon}
              className="absolute left-2 top-2 w-6"
              onClick={() => setShowPublicationPopup(false)}
            />
            <div className="flex h-full flex-col space-y-3 p-4">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={t("pages.boosts.video.comment")}
                className="h-10 w-full rounded-xl border-none bg-[#666666] p-2 text-white"
              />
              <OptionalButton
                className="w-full rounded-xl p-2 text-white"
                text={t("components.videoItem.publish")}
                onClick={onVideoPublish}
                active={!pending}
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {videos.map((v, idx) => (
        <VideoItem
          key={idx}
          onPublishClick={() => onPublishClick(v)}
          playbackUrl={v.playback_url}
          published={v.published}
          createdAt={v.created_at}
          reward={v.reward}
        />
      ))}
      <div ref={observerTarget}></div>
    </div>
  );
}

export default VideosPage;
