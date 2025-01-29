import { useInitData } from "@vkruglikov/react-telegram-web-app";
import { useEffect, useMemo } from "react";
import UserInfoStore from "../stores/UserInfoStore";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CameraProvider from "../components/camera-provider/CameraProvider";
import PageLayout from "../components/page-layout/PageLayout";
import MainPage from "../pages/main/MainPage";
import WorkInProgressPage from "../pages/work-in-progress/WorkInProgressPage";
import FriendsPage from "../pages/friends/FriendsPage";
import FriendList from "../pages/friend-list/FriendList";
import BoostsBage from "../pages/boosts/BoostsPage";
import VideosPage from "../pages/videos/VideosPage";
import RegisterPage from "../pages/register/RegisterPage";
import History from "../pages/history";
import BuyingBoost from "../pages/boosts/buying";
import BuyBoostExchange from "../pages/boosts/exchange";
import ExchangeVariants from "../pages/boosts/exchange/variants";
import BuyBoostMarket from "../pages/boosts/market";
import WaysOfMining from "../pages/ways-mining";
import FaceDetectorPage from "../pages/ways-mining/detector/face";
import BackDetectorPage from "../pages/ways-mining/detector/back";


const Router = () => {
  const [, initData] = useInitData();

  useEffect(() => {
    const store = new UserInfoStore(initData!);
    store.fetchAll();
  }, [initData]);

  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          element: <PageLayout />,
          children: [
            { path: "/main", element: <MainPage /> },
            { path: "/history", element: <History /> },
            { path: "/groups", element: <WorkInProgressPage /> },
            { path: "/wallet", element: <WorkInProgressPage /> },
            { path: "/friends", element: <FriendsPage /> },
            { path: "/friends/list", element: <FriendList /> },
            { path: "/boosts", element: <BoostsBage /> },
            { path: "/boosts/videos", element: <VideosPage /> },
            { path: "/boosts/buy", element: <BuyingBoost /> },
            { path: "/boosts/exchange", element: <BuyBoostExchange /> },
            { path: "/boosts/exchange/variants", element: <ExchangeVariants /> },
            { path: "/boosts/market", element: <BuyBoostMarket /> },
            { path: "/mining-ways", element: <WaysOfMining /> },
            {
              element: <CameraProvider />,
              children: [

                { path: "/mining-ways/face-detector", element: <FaceDetectorPage /> },
                { path: "/mining-ways/back-detector", element: <BackDetectorPage /> },
              ]
            }
          ],
        },

        { path: "/register", element: <RegisterPage /> },
      ]),
    [],
  );
  return <RouterProvider router={router} />;
};

export default Router;
