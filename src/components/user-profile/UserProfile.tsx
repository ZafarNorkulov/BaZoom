import userPic from "./assests/user-icon.svg";
import novice from "./assests/novice.svg";
import silver from "./assests/silver.svg";
import gold from "./assests/gold.svg";
import bronze from "./assests/bronze.svg";
import { useEffect, useState } from "react";
import { useInitData } from "@vkruglikov/react-telegram-web-app";
import i18next from "i18next";
import { getProfilePhotoUrl } from "../../services/UserService";

export enum UserLevel {
  Novice,
  Bronze,
  Silver,
  Gold,
}

interface UserStatus {
  icon: string;
  text: string;
}

function statusFromLevel(level: UserLevel): UserStatus {
  switch (level) {
    case UserLevel.Novice:
      return {
        icon: novice,
        text: i18next.t("components.userProfile.level.novice"),
      };
    case UserLevel.Bronze:
      return {
        icon: bronze,
        text: i18next.t("components.userProfile.level.bronze"),
      };
    case UserLevel.Silver:
      return {
        icon: silver,
        text: i18next.t("components.userProfile.level.silver"),
      };
    case UserLevel.Gold:
      return {
        icon: gold,
        text: i18next.t("components.userProfile.level.gold"),
      };
  }
}

interface UserProfileProps {
  userLevel: UserLevel;
  name: string;
  userId: number;
  secondary?: boolean;
}


function UserProfile({ userLevel, name, userId, secondary }: UserProfileProps) {
  const { icon, text } = statusFromLevel(userLevel);
  const [profilePhoto, setProfilePhoto] = useState<string>(userPic);
  const [, initData] = useInitData();

  useEffect(() => {
    getProfilePhotoUrl(initData!, userId).then((url) => {
      if (url) setProfilePhoto(url);
    });
  }, []);
  return (
    <div className="flex h-10 max-w-[100%] flex-row items-center">
      <img
        src={profilePhoto || userPic}
        className="mr-3 h-10 w-10 rounded-2xl"
      />
      <div className="flex h-full flex-col flex-wrap items-start justify-around pb-1 pt-1">
        <div className="max-h-[15px] max-w-[100%] overflow-x-hidden overflow-y-hidden text-left text-[12px] font-bold text-white">
          {name}
        </div>
        <div className="flex flex-row items-center">
          <img src={icon} className="small-icon-size mr-1"></img>{" "}
          <p
            className="leaing-[133%] text-[12px] tracking-[0.01em]"
            style={{
              fontWeight: secondary ? 400 : 500,
            }}
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
export type { UserProfileProps };
