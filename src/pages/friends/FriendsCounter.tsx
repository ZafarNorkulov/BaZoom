import friendsActive from "../../assets/friends-active.svg";
import { formatNumber } from "../../services/UIService";

interface FriendsCounterProps {
  name: string;
  count: number;
}

function FriendsCounter({ name, count }: FriendsCounterProps) {
  return (
    <div className="flex h-[61px] w-[90px] flex-col items-center justify-center rounded-[10px] bg-black">
      <div className="flex flex-row items-center justify-center">
        <img
          src={friendsActive}
          className="inline-block h-[25px] w-[25px] pr-[5px]"
        />
        <p className="text-center text-sm font-bold text-white">
          {formatNumber(count)}
        </p>
      </div>
      <p className="text-[10px] font-semibold tracking-[0.01em] text-white">
        {name}
      </p>
    </div>
  );
}

export default FriendsCounter;
