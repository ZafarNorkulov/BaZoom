import UserProfile, {
  UserLevel,
} from "../../components/user-profile/UserProfile";
import taxiIcon from "../../assets/taxi-icon.png";
import { formatNumber } from "../../services/UIService";

interface FriendStatsProps {
  name: string;
  userId: number;
  userLevel: UserLevel;
  income: number;
}
function FriendStats({ name, userId, userLevel, income }: FriendStatsProps) {
  return (
    <div className="flex h-10 w-full max-w-full flex-row items-center justify-between">
      <UserProfile
        name={name}
        userId={userId}
        userLevel={userLevel}
        secondary
      />
      <p className="min-w-max text-left text-[14px] font-normal leading-[143%] text-white">
        + {formatNumber(income)}{" "}
        <img
          src={taxiIcon}
          className="mb-0.5 inline-block h-[15px] w-[15px] rounded-[3px]"
        />
      </p>
    </div>
  );
}

export default FriendStats;
