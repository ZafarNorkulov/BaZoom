import GameStatus from "./GameStatus";
import UserProfile from "../user-profile/UserProfile";
import { UserLevel } from "../user-profile/UserProfile";
import { useInitData } from "@vkruglikov/react-telegram-web-app";
import left from "./assets/left.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Header() {
  const [initDataUnsafe] = useInitData();
  const user = initDataUnsafe!.user!;
  const fullName =
    user?.first_name + (user?.last_name ? " " + user?.last_name : "");
  const [isSubpage, setIsSubpage] = useState(false);

  const location = useLocation();
  useEffect(() => {
    setIsSubpage((location.pathname.match(/\//g) || []).length >= 2);
  }, [location]);

  const [gameData, setGameData] = useState<any>(null);

  const navigate = useNavigate();
  const userId = user?.id;
  useEffect(() => {
    if (!userId) return;
    fetch("/api/dice/balance?user_id=" + userId)
      .then((res) => res.json())
      .then((data) => setGameData(data));
    console.log(gameData);
  }, [userId]);
  return (
    <div
      className={
        `h-13  flex max-w-full flex-row items-center justify-between p-4 text-xs text-gray ${isSubpage ? "pl-0" : ""} ${location.pathname === "/" ? "" : "border-b-thin"}`
      }
    >
      <div className="flex flex-row items-center">
        {isSubpage ? (
          <button
            className="flex items-center justify-center pl-2 pr-2"
            onClick={() => navigate(-1)}
          >
            <img src={left} className="h-5 w-5" />
          </button>
        ) : (
          ""
        )}
        <UserProfile
          userLevel={UserLevel.Novice}
          name={fullName}
          userId={userId}
        />
      </div>
      <GameStatus />
    </div>
  );
}

export default Header;
