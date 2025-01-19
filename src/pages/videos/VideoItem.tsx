import taxiIcon from "../../assets/taxi-icon.png";
import OptionalButton from "../../components/optional-button/OptionalButton";
import { useTranslation } from "react-i18next";
import { formatNumber } from "../../services/UIService";
interface VideoItemProps {
  onPublishClick: () => void;
  published: boolean;
  playbackUrl: string;
  createdAt: string;
  reward: number;
}
function VideoItem({
  onPublishClick,
  published,
  playbackUrl,
  createdAt,
  reward,
}: VideoItemProps) {
  const publicationDate = new Date(createdAt);
  const { t } = useTranslation();
  return (
    <div className="flex w-full flex-row justify-between rounded-xl bg-dimgray p-1">
      <video
        src={playbackUrl}
        className="h-[27vw] w-[27vw] rounded-xl"
        autoPlay
        loop
      />

      <div className="flex h-[27vw] flex-col items-end justify-between p-2">
        <div className="flex flex-col items-end">
          <p className="text-right text-sm text-white">
            {t("components.videoItem.created")}:{" "}
            {publicationDate.toLocaleDateString()}
          </p>
          <div className="h-max w-max text-right text-white">
            + {formatNumber(reward)}{" "}
            <img
              src={taxiIcon}
              className="mb-1 inline h-[15px] w-[15px] rounded-[3px]"
            />
          </div>
        </div>
        <OptionalButton
          active={!published}
          text={t("components.videoItem.publish")}
          onClick={onPublishClick}
        />
      </div>
    </div>
  );
}

export default VideoItem;
