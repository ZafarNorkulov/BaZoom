import { useExpand, useInitData } from "@vkruglikov/react-telegram-web-app";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../../services/UserService.ts";
import LoadingScreen from "../loading-screen/LoadingScreen.tsx";



const RootPage = () => {
    const [isExpanded, expand] = useExpand();
    if (!isExpanded) expand();

    const [, initData] = useInitData();
    const [isLoading, setLoading] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const navigate = useNavigate()

    // Если нет данных Telegram, показываем страницу перенаправления
    useEffect(() => {
        if (!initData) return;

        // Начинаем с 0%
        setLoadingProgress(0);

        // Анимируем до 80% за 5 секунд
        const progressInterval = setInterval(() => {
            setLoadingProgress(prev => Math.min(prev + 2, 80));
        }, 125);

        getProfile(initData).then((res) => {
            console.log(res, "root")
            updateProfile(initData);
            setTimeout(() => {
                if (!res) navigate("/register");
                setLoading(false);
            }, 2000);
            // Очищаем интервал
            clearInterval(progressInterval);

            // Анимируем до 100% за 1 секунду
            setLoadingProgress(100);

        });
    }, [initData]);



    return isLoading ? <LoadingScreen progress={loadingProgress} /> : <Navigate to={"/main"} replace />
};

export default RootPage;
