import { useTranslation } from "react-i18next";
import BoostItem from "./BoostItem";
import videoImage from "./assets/sticker.gif";
import voucherImage from "./assets/voucher.png";
import taxiIcon from "../../assets/taxitaxi.jpeg";

function BoostsBage() {
  const { t } = useTranslation();
  return (
    <div className="flex h-max w-screen flex-col space-y-4 p-3 pt-4">
      <BoostItem
        header={t("pages.boosts.video.header")}
        description={t("pages.boosts.video.description")}
        price={t("pages.boosts.video.price")}
        link="/boosts/videos"
        image={videoImage}
        active
      />
      <BoostItem
        header={t("pages.boosts.voucher.header")}
        description={t("pages.boosts.voucher.description")}
        price={t("pages.boosts.voucher.price")}
        image={voucherImage}
        link="/"
      />
      <BoostItem
        header={t("pages.boosts.holding.1k.header")}
        description={t("pages.boosts.holding.1k.description")}
        price={t("pages.boosts.holding.1k.price")}
        image={taxiIcon}
        link="/"
      />
      <BoostItem
        header={t("pages.boosts.holding.5k.header")}
        description={t("pages.boosts.holding.5k.description")}
        price={t("pages.boosts.holding.5k.price")}
        image={taxiIcon}
        link="/"
      />
      <BoostItem
        header={t("pages.boosts.holding.10k.header")}
        description={t("pages.boosts.holding.10k.description")}
        price={t("pages.boosts.holding.10k.price")}
        image={taxiIcon}
        link="/"
      />
    </div>
  );
}

export default BoostsBage;
