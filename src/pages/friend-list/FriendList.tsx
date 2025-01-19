import { useInitData } from "@vkruglikov/react-telegram-web-app";
import { UserLevel } from "../../components/user-profile/UserProfile";
import {
  getReferalLink,
  getReferalProfiles,
  getReferalStats,
  ReferalProfileContract,
} from "../../services/ReferalService";
import FriendStats from "./FriendStats";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface FriendStats {
  name: string;
  userLevel: UserLevel;
  income: number;
  profilePhoto: string;
}

function FriendList() {
  const [items, setItems] = useState<ReferalProfileContract[]>([]);
  const limit = 10;
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);

  const [refLink, setRefLink] = useState("");

  const [, initData] = useInitData();

  const observerTarget = useRef(null);

  const { t } = useTranslation();

  const fetchItems = useCallback(async () => {
    if (loading) return;
    if (offset >= total) return;
    setLoading(true);
    try {
      const newItems = await getReferalProfiles(initData!, limit, offset);
      setItems((items) => [...items, ...newItems]);
      setOffset((offset) => Math.min(offset + limit, total));
    } finally {
      setLoading(false);
    }
  }, [limit, initData, offset, total]);

  useEffect(() => {
    getReferalLink(initData!).then(setRefLink);
    getReferalStats(initData!)
      .then(({ premium_count, basic_count }) => premium_count + basic_count)
      .then((total) => {
        setTotal(total);
        fetchItems();
      });
  }, [initData]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchItems();
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
  }, [fetchItems]);

  return (
    <div className="w-screen p-4 pt-2.5">
      <div className="w-full rounded-xl bg-deepgray p-4">
        <div className="border-b-[0.5px] border-darkgray">
          <p className="mb-4 w-max rounded-full bg-[#896CFE] pb-1 pl-2 pr-2 pt-1 text-[14px] font-normal leading-[143%] text-white">
            {t("pages.friendList.invitedFriends")}
          </p>
        </div>
        <div className="flex flex-col space-y-6 pt-5">
          {items.length > 0 ? (
            items.map((e, idx) => (
              <FriendStats
                key={idx}
                name={e.name}
                userLevel={UserLevel.Novice}
                income={e.earned}
                userId={e?.id}
              />
            ))
          ) : (
            <>
              <p className="text-center text-white">
                {t("pages.friendList.empty")} :(
              </p>
              <button
                className="taxi-gradient h-12 w-full rounded-xl text-center text-xs font-semibold text-white active:bg-darkgray active:bg-none"
                onClick={() => navigator.clipboard.writeText(refLink)}
              >
                {t("pages.friends.copyLink")}
              </button>
            </>
          )}
        </div>
        <div ref={observerTarget}></div>
      </div>
    </div>
  );
}

export default FriendList;
