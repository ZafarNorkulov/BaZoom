import { useCallback, useEffect, useRef, useState } from "react";
import { publishVideo, VideoContract } from "../../services/VideoService";
import { useInitData } from "@vkruglikov/react-telegram-web-app";
import VideoItem from "./VideoItem";
import cancelIcon from "./assets/cancel.svg";
import { useTranslation } from "react-i18next";
import OptionalButton from "../../components/optional-button/OptionalButton";
import { observer } from "mobx-react-lite";
import { useStore } from "../../components/store-provider/StoreProvider";
import VideoListStore from "../../stores/VideoListStore";

interface VideoItemProps {
  onPublishClick: (v: VideoContract) => void;
  videoStore: VideoListStore;
}
const VideoItems = observer(
  ({ videoStore, onPublishClick }: VideoItemProps) => {
    return (
      <>
        {videoStore.items.map((v, idx) => (
          <VideoItem
            key={idx}
            onPublishClick={() => onPublishClick(v)}
            playbackUrl={v.playback_url}
            published={v.published}
            createdAt={v.created_at}
            reward={v.reward}
          />
        ))}
      </>
    );
  },
);

const PhotoCount = observer(() => {
  const { userStore } = useStore();
  const { t } = useTranslation();

  const count = userStore.photoCount;
  const percentCreation = Math.min(count / 10, 1) * 100;
  const percentMax = Math.min(count / 100, 1) * 100;

  const isCreation = percentCreation < 100;

  const barPercent = isCreation ? percentCreation : percentMax;
  const barColor = isCreation
    ? "taxi-gradient"
    : "bg-gradient-to-l from-[#64FF54] to-[#00DD89]";
  const hintText = isCreation
    ? t("pages.boosts.video.toCreateAVideo")
    : t("pages.boosts.video.tillMax");

  useEffect(() => {
    userStore.fetchPhotoCount();
  }, [userStore]);

  return (
    <div className="flex w-full flex-col items-start rounded-xl bg-dimgray p-2">
      <div
        className={barColor + " " + "h-8 rounded-xl transition-all"}
        style={{ width: `${barPercent.toFixed(2)}%` }}
      ></div>
      <p className="mt-1 w-full text-center">
        {count} / {isCreation ? 10 : 100} {hintText}
      </p>
    </div>
  );
});

const VideosPage = observer(() => {
  const [, initData] = useInitData();
  const [showPublicationPopup, setShowPublicationPopup] = useState(false);
  const [comment, setComment] = useState("");
  const [pending, setPending] = useState(false);
  const [publishingVideo, setPublishingVideo] = useState<
    VideoContract | undefined
  >(undefined);

  const { t } = useTranslation();

  const observerTarget = useRef(null);

  const { videoStore } = useStore();

  useEffect(() => {
    if (videoStore.loading || !videoStore.hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          videoStore.fetchNewItems();
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
  }, [videoStore]);

  const onPublishClick = useCallback((v: VideoContract) => {
    setShowPublicationPopup(true);
    setPublishingVideo(v);
  }, []);

  const onVideoPublish = async () => {
    setPending(true);
    await publishVideo(initData!, publishingVideo!.id, comment);
    publishingVideo!.published = true;
    videoStore.items = [...videoStore.items];
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
      <PhotoCount />
      <VideoItems onPublishClick={onPublishClick} videoStore={videoStore} />
      <div ref={observerTarget}></div>
    </div>
  );
});

export default VideosPage;
