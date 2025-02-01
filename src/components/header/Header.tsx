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
  const userId = 1742336847;
  const daats = `user=%7B%22id%22%3A1742336847%2C%22first_name%22%3A%22Zafar%22%2C%22last_name%22%3A%22Norkulov%22%2C%22username%22%3A%22Zafar_Norkulov%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2F4OQHgqkBTQzZX8WGfD-hlRPvpUjXNuMNwFMpYDjE2pQ.svg%22%7D&chat_instance=-5929298958289053064&chat_type=sender&auth_date=1738395817&signature=o07nFOnIWPHbKHyUvf8HDVO-LQdRtSFWdlWKBBxImthTc5yaCg1rD9F1YQoGgNZU_a8ziG3x0GYJFsoxgaqQCA&hash=b785da2d494b89d2e7e1023bcd6ea4b2815b2de1009acf2555d142dae3d08aa4`

  async function getData (data:string): Promise<any>{
    fetch(`https://bot.bazoom.ru/api/users/profile`, {
      method: "GET",
      headers: {
        "Init-Data": data,
      },
    })
      .then((res) => res.json())
      .then((data) => setGameData(data));
  }

  useEffect(() => {
    if (!(userId)) return;
    getData(daats);
  }, [userId]);

  console.log(gameData);



  return (
    <div
      className={
        `h-13 pc:h-12  flex max-w-full flex-row items-center justify-between p-[10px] text-xs text-gray ${isSubpage ? "pl-0" : ""} ${location.pathname === "/" ? "" : "border-b-thin"}`
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
