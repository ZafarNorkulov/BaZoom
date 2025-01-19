import NavMenuIcon from "./NavMenuIcon";
import homeIcon from "./assets/home.svg";
import homeActiveIcon from "./assets/home-active.svg";
import groupsIcon from "./assets/groups.svg";
import groupsActiveIcon from "./assets/groups-active.svg";
import friendsIcon from "./assets/friends.svg";
import friendsActiveIcon from "../../assets/friends-active.svg";
import walletIcon from "./assets/wallet.svg";
import walletActiveIcon from "./assets/wallet-active.svg";
import boltIcon from "./assets/bolt.svg";
import boltActiveIcon from "./assets/bolt-active.svg";
import { useTranslation } from "react-i18next";

function NavMenu() {
  const { t } = useTranslation();
  return (
    <div
      style={{
        backgroundImage: `url(/assets/background.svg)`,
        backgroundPositionX: "-1px",
      }}
      className="fixed bottom-0 left-0 flex h-[28vw] w-screen flex-row justify-evenly bg-cover pl-[2vw] pr-[2vw] pt-[14vw]"
    >
      <div className="flex h-14 w-full flex-row justify-around pr-[10vw]">
        <NavMenuIcon
          icon={homeIcon}
          iconActive={homeActiveIcon}
          text={t("components.navMenu.main")}
          to={"/"}
          white
        />
        <NavMenuIcon
          icon={groupsIcon}
          iconActive={groupsActiveIcon}
          text={t("components.navMenu.groups")}
          to={"/groups"}
        />
      </div>
      <div className="absolute left-1/2 top-5 flex min-h-[13vw] min-w-[13vw] -translate-x-1/2 items-center justify-center rounded-full bg-black">
        <NavMenuIcon
          icon={boltIcon}
          iconActive={boltActiveIcon}
          to={"/boosts"}
        ></NavMenuIcon>
      </div>
      <div className="flex h-14 w-full flex-row justify-around pl-[10vw]">
        <NavMenuIcon
          icon={walletIcon}
          iconActive={walletActiveIcon}
          text={t("components.navMenu.wallet")}
          to={"/wallet"}
        />
        <NavMenuIcon
          icon={friendsIcon}
          iconActive={friendsActiveIcon}
          text={t("components.navMenu.friends")}
          to={"/friends"}
          white
        />
      </div>
    </div>
  );
}

export default NavMenu;
